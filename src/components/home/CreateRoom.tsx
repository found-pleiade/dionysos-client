import React from "react";
import useCreateRoom from "../../states/room/createRoom";
import Button from "../Button";

const CreateRoom = () => {
  const { data, isLoading, error, mutate } = useCreateRoom();

  const url = data ? `${window.location.href}?share=${data.id}` : "";

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  return data ? (
    <Button headless onClick={copyUrl}>
      {url}
    </Button>
  ) : (
    <Button loading={isLoading} onClick={mutate}>
      {error ? "An error occured, try again" : "Create a room"}
    </Button>
  );
};

export default CreateRoom;
