import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useJoinRoom = (shareId: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, isError, isSuccess, refetch } = useQuery(
    ["joinRoom"],
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
    isError,
    isSuccess,
    refetch,
  };
};

export default useJoinRoom;
