import React, { useContext, useEffect, useState } from "react";
import { GlobeAltIcon, ReplyIcon } from "@heroicons/react/solid";
import Button from "../Button";
import Input from "../Input";
import SpaceBetween from "../../layouts/SpaceBetween";
import ErrorCard from "../ErrorCard";
import {
  SettingsContext,
  ActionTypes as SettingsActionTypes,
} from "../../states/settings";
import RowGroup from "../../layouts/RowGroup";
import useVersion from "../../features/version";
import Form from "../Form";
import SimpleDialog from "../SimpleDialog";

const ServerModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const settings = useContext(SettingsContext);
  const [serverAddress, setServerAddress] = useState(settings.get.server);
  const { isSuccess, isCompatible, isCorrect, refetch, error, isLoading } =
    useVersion(serverAddress);

  const exitModal = () => {
    if (!error) setServerAddress(settings.get.server);
    closeModal();
  };

  const setInitialServerAddress = () => {
    settings.dispatch({
      type: SettingsActionTypes.SET_SERVER_DEFAULT,
      payload: {},
    });

    setServerAddress(settings.getInitial.server);
  };

  useEffect(() => {
    if (isSuccess && isOpen) {
      settings.dispatch({
        type: SettingsActionTypes.SET_SERVER,
        payload: { server: serverAddress },
      });

      closeModal();
    }
  }, [isSuccess]);

  return (
    <>
      <Button
        className="absolute top-0 right-0 min-w-0 w-10 h-10 px-2 rounded-none rounded-bl-lg"
        onClick={openModal}
      >
        <GlobeAltIcon />
      </Button>

      <SimpleDialog
        show={isOpen}
        closeFunction={exitModal}
        title="Server address"
        closeDelayCondition={isSuccess}
      >
        <Form onSubmit={() => refetch()}>
          <RowGroup>
            <Button
              className="min-w-0 self-center flex-1 rounded-r-none px-5"
              onClick={setInitialServerAddress}
              title="Restore default address"
            >
              <ReplyIcon className="h-5" />
            </Button>

            <Input
              disabled={isLoading}
              className="my-4 rounded-l-none"
              value={serverAddress}
              setValue={setServerAddress}
            />
          </RowGroup>

          <ErrorCard show={error ? true : false}>
            An error occurred while fetching the version.
            <br />
            Check your internet connection and the url.
          </ErrorCard>

          <ErrorCard show={!error && !isCorrect}>
            Incorrect data, is the uri correct?
          </ErrorCard>

          <ErrorCard show={!error && !isCompatible && isCorrect}>
            Version mismatch between the client and the server api.
          </ErrorCard>

          <SpaceBetween>
            <Button onClick={exitModal} colorless>
              Back
            </Button>

            <Button type="submit" success={isSuccess} loading={isLoading}>
              {error || !isCorrect ? "Retry" : "Save"}
            </Button>
          </SpaceBetween>
        </Form>
      </SimpleDialog>
    </>
  );
};

export default ServerModal;
