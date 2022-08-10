import React, { useContext, useEffect, useState } from "react";
import { ShareContext } from "../../features/shareRoom";
import useCreateRoom from "../../states/room/createRoom";
import Button from "../Button";

const CreateRoom = () => {
  const { data, isLoading, error, mutate } = useCreateRoom();
  const { createUrl, isJoining } = useContext(ShareContext);
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!data) return;
    setUrl(createUrl(data.uri.split("/").pop()));
  }, [data]);

  const copyUrl = () => {
    navigator.clipboard.writeText(url);
  };

  if (isJoining) return <div role={"none"}></div>;

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
