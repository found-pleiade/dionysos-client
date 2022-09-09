import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";
import { isRequestValid } from "../../utils";

const useJoinRoom = (shareId: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, isError, isSuccess, refetch } = useQuery(
    ["joinRoom"],
    () =>
      fetch(`${settings.get.server}/rooms/${shareId}/connect`, {
        headers: auth.newHeaders(user),
        method: "PATCH",
      }).then((res) => {
        if (isRequestValid(res)) return res.json();
        throw new Error("Something went wrong");
      }),
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
