import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../features/auth";
import { ShareContext } from "../../features/shareRoom";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useJoinRoom = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const share = useContext(ShareContext);

  const { isLoading, error, isSuccess, refetch } = useQuery(
    "joinRoom",
    () => {
      return fetch(`${settings.get.server}/rooms/${share.id}/connect`, {
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
