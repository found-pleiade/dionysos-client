import React, { useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import SpaceBetween from "../../layouts/SpaceBetween";
import useRenameUser from "../../states/user/renameUser";
import ErrorCard from "../ErrorCard";
import { isValid, isValidConditions } from "../../utils";
import useGetUser from "../../states/user/getUser";
import { useQueryClient } from "@tanstack/react-query";
import { PencilAltIcon } from "@heroicons/react/solid";
import Form from "../Form";
import SimpleDialog from "../SimpleDialog";

const UserDisplay = () => {
  // Used to invalidate getUser on renaming
  const queryClient = useQueryClient();

  // Those are values used for setTimeouts, and the close animation.
  const closeOnSuccessDelay = 500;
  const closeDuration = 200;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getUser = useGetUser();
  const renameUser = useRenameUser();
  const [username, setUsername] = useState("");

  // Use a timeout to clear errors
  // after the animation is done.
  const closeModal = () => {
    setIsDialogOpen(false);

    setTimeout(() => {
      renameUser.reset();
    }, closeDuration);
  };

  const openModal = () => {
    setUsername(getUser.data?.name);
    setIsDialogOpen(true);
  };

  // Use a timeout to clear data
  // after the animation is done.
  useEffect(() => {
    if (renameUser.isSuccess && isDialogOpen) {
      queryClient.invalidateQueries(["getUser"]);
      setIsDialogOpen(false);

      setTimeout(() => {
        renameUser.reset();
      }, closeOnSuccessDelay + closeDuration);
    }
  }, [renameUser.isSuccess]);

  return (
    <>
      <Button
        headless
        onClick={openModal}
        className="text-left flex"
        title="Change your name"
      >
        {getUser.data?.name}
        <PencilAltIcon className="ml-1 h-5" />
      </Button>

      <SimpleDialog
        show={isDialogOpen}
        title="Username"
        closeFunction={closeModal}
        closeDelayCondition={renameUser.isSuccess}
      >
        <Form onSubmit={() => renameUser.mutate(username)}>
          <Input
            disabled={renameUser.isLoading}
            className="mb-4"
            value={username}
            setValue={setUsername}
          />

          <ErrorCard show={!isValidConditions.gteTwo(username)}>
            Minimum length is 2 chars
          </ErrorCard>

          <ErrorCard show={!isValidConditions.lteTwenty(username)}>
            Maximum length is 20 chars
          </ErrorCard>

          <ErrorCard show={renameUser.error ? true : false}>
            An error occurred while trying to rename you.
          </ErrorCard>

          <SpaceBetween>
            <Button onClick={closeModal} colorless>
              Back
            </Button>

            <Button
              type="submit"
              success={renameUser.isSuccess}
              disabled={!isValid(username)}
              loading={renameUser.isLoading}
            >
              {renameUser.error ? "Retry" : "Save"}
            </Button>
          </SpaceBetween>
        </Form>
      </SimpleDialog>
    </>
  );
};

export default UserDisplay;
