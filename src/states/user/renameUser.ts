import { useContext } from "react";
import { useMutation } from "react-query";
import { SettingsContext } from "../settings";
import { UserContext } from ".";
import { AuthContext } from "../../features/auth";

const useRenameUser = (name: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, data, mutate, reset } = useMutation(
    "renameUser",
    () =>
      fetch(`${settings.get.server}${user.get.uri}`, {
        method: "PATCH",
        headers: auth.newHeaders(user),
        body: JSON.stringify({ name }),
      }).then((res) => res)
  );

  return {
    isLoading,
    error,
    data,
    mutate,
    reset,
  };
};

export default useRenameUser;
