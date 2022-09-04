import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { SettingsContext } from "../settings";

const useCreateUser = (name: string) => {
  const settings = useContext(SettingsContext);

  const { isLoading, error, data, mutate } = useMutation(["createUser"], () =>
    fetch(`${settings.get.server}/users`, {
      method: "POST",
      body: JSON.stringify({ name }),
    }).then((res) => res.json())
  );

  return {
    isLoading,
    error,
    data,
    mutate,
  };
};

export default useCreateUser;
