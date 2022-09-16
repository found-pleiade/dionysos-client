import React, { useContext, useEffect, useState } from "react";
import Button from "../Button";
import Input from "../Input";
import SpaceBetween from "../../layouts/SpaceBetween";
import ErrorCard from "../ErrorCard";
import {
  SettingsContext,
  ActionTypes as SettingsActionTypes,
} from "../../states/settings";
import useVersion from "../../features/version";
import Form from "../Form";
import SimpleDialog from "../SimpleDialog";

const ServerDialog = ({ className }: { className?: string }) => {
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
    if (!error && !isLoading) setServerAddress(settings.get.server);
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
      <Button onClick={openModal} className={className}>
        Server settings
      </Button>

      <SimpleDialog
        show={isOpen}
        closeFunction={exitModal}
        title={
          <SpaceBetween>
            Server address
            <Button
              className="text-base font-normal"
              onClick={setInitialServerAddress}
              title="Restore default address"
            >
              Restore default
            </Button>
          </SpaceBetween>
        }
        closeDelayCondition={isSuccess}
      >
        <Form onSubmit={() => refetch()}>
          <Input
            disabled={isLoading}
            className="mb-4"
            value={serverAddress}
            setValue={setServerAddress}
          />

          <ErrorCard show={error ? true : false}>
            Either :
            <br />
            - Your internet connection is down
            <br />
            - The server is down
            <br />- The URL is wrong
          </ErrorCard>

          <ErrorCard show={!error && !isCorrect}>
            The client expect a string from <code>/version</code> with the
            format <code>x.x.x</code> and the data doesn&apos;t match it.
            <br />
            It&apos;s probably happening because of an incorrect URI.
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

export default ServerDialog;
