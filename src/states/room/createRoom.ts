import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";
import { isRequestValid } from "../../utils";

const useCreateRoom = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, data, refetch, isSuccess } = useQuery<
    | {
        password: string;
        uri: string;
      }
    | undefined,
    Error
  >(
    ["createRoom"],
    () =>
      fetch(`${settings.get.server}/rooms`, {
        headers: auth.newHeaders(user),
        method: "POST",
        body: JSON.stringify({
          name: "miaou",
        }),
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
    error,
    data,
    refetch,
    isSuccess,
  };
};

export default useCreateRoom;
