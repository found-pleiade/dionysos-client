import { createContext, useState } from "react";

const useShareRoom = () => {
  const [id, setId] = useState("");

  const scanUrl = () => {
    const share = new URLSearchParams(window.location.search).get("share");

    if (share) setId(share);
  };

  const createUrl = (id: string) => {
    if (!id) return "";
    setId(id);
    return `${window.location.href}?share=${id}`;
  };

  const isJoining = id.length > 0;

  return { id, scanUrl, createUrl, isJoining };
};

const ShareContext = createContext(
  null as any as ReturnType<typeof useShareRoom>
);

export default useShareRoom;
export { ShareContext };
