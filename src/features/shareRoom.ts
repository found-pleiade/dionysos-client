import { createContext, useState } from "react";

const useShareRoom = () => {
  const [id, setId] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const scanUrl = () => {
    const scannedId = new URLSearchParams(window.location.search).get("share");
    if (scannedId) {
      setId(scannedId);
      setIsJoining(true);
    }
  };

  const createUrl = (roomId: string) => {
    if (!roomId) return "";
    setId(roomId);
    return `${window.location.href}?share=${roomId}`;
  };

  return { id, scanUrl, createUrl, isJoining };
};

const ShareContext = createContext(
  null as any as ReturnType<typeof useShareRoom>
);

export default useShareRoom;
export { ShareContext };
