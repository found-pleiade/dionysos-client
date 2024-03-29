import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { SettingsContext } from "../settings";
import { UserContext } from ".";
import { AuthContext } from "../../features/auth";

const useRenameUser = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, isSuccess, mutate, reset } = useMutation(
    (name: string) =>
      fetch(`${settings.get.server}${user.get.uri}`, {
        method: "PATCH",
        headers: auth.newHeaders(user),
        body: JSON.stringify({ name }),
      }).then((res) => res)
  );

  return {
    isSuccess,
    isLoading,
    error,
    mutate,
    reset,
  };
};

export default useRenameUser;
