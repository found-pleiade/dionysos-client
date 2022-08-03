import { createContext, useState } from "react";

const useShareRoom = () => {
  const [id, setId] = useState("");

  const setParam = () => {
    const share = new URLSearchParams(window.location.search).get("share");

    if (share) setId(share);
  };

  const isJoining = id.length > 0 ? true : false;

  return { id, setParam, isJoining };
};

const ShareContext = createContext(null as any as ReturnType<typeof useShareRoom>);

export default useShareRoom;
export { ShareContext };
