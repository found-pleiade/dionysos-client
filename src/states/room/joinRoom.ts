import { useContext } from "react";
import { useMutation } from "react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useJoinRoom = (roomId: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, data, mutate } = useMutation("joinRoom", () =>
    fetch(`${settings.get.server}/rooms/${roomId}/join`, {
      headers: auth.newHeaders(user),
      method: "POST",
    }).then((res) => res.json())
  );

  return {
    isLoading,
    error,
    data,
    mutate,
  };
};

export default useJoinRoom;
