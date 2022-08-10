import { useContext } from "react";
import { useMutation } from "react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useJoinRoom = (roomId: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, isSuccess, mutate } = useMutation("joinRoom", () =>
    fetch(`${settings.get.server}/rooms/${roomId}/connect`, {
      headers: auth.newHeaders(user),
      method: "PATCH",
    })
  );

  return {
    isLoading,
    error,
    mutate,
    isSuccess
  };
};

export default useJoinRoom;
