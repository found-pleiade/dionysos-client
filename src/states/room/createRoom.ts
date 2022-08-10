import { useContext } from "react";
import { useMutation } from "react-query";
import { AuthContext } from "../../features/auth";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useCreateRoom = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, data, mutate } = useMutation("createRoom", () =>
    fetch(`${settings.get.server}/rooms`, {
      headers: auth.newHeaders(user),
      method: "POST",
      body: JSON.stringify({
        name: "miaou",
      }),
    }).then((res) => res.json())
  );

  return {
    isLoading,
    error,
    data,
    mutate,
  };
};

export default useCreateRoom;
