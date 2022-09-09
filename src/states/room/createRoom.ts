import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useCreateRoom = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, isError, data, refetch, isSuccess } = useQuery(
    ["createRoom"],
    () =>
      fetch(`${settings.get.server}/rooms`, {
        headers: auth.newHeaders(user),
        method: "POST",
        body: JSON.stringify({
          name: "miaou",
        }),
      }).then((res) => res.json()),
    {
      enabled: false,
    }
  );

  return {
    isLoading,
    isError,
    data,
    refetch,
    isSuccess,
  };
};

export default useCreateRoom;
