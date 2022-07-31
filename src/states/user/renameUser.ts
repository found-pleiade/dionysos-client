import { useContext } from "react";
import { useMutation } from "react-query";
import { SettingsContext } from "../settings";
import { UserContext } from ".";

const useRenameUser = (name: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);

  const { isLoading, error, data, mutate, reset } = useMutation(
    "renameUser",
    () =>
      fetch(`${settings.get.server}${user.get.uri}`, {
        method: "PATCH",
        headers: new Headers({
          Authorization: `Basic ${user.get.id}:${settings.get.password}`,
        }),
        body: JSON.stringify({ name }),
      }).then((res) => res)
  );

  const safeMutate = () => {
    if (data || isLoading) return;
    mutate();
  };

  return {
    isLoading,
    error,
    data,
    safeMutate,
    reset,
  };
};

export default useRenameUser;
