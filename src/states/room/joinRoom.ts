import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useJoinRoom = (shareId: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, isSuccess, refetch } = useQuery(
    "joinRoom",
    () => {
      return fetch(`${settings.get.server}/rooms/${shareId}/connect`, {
        headers: auth.newHeaders(user),
        method: "PATCH",
      });
    },
    {
      enabled: false,
    }
  );

  return {
    isLoading,
    error,
    isSuccess,
    refetch,
  };
};

export default useJoinRoom;
