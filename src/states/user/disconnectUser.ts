import { useContext } from "react";
import { useMutation } from "react-query";
import { SettingsContext } from "../settings";
import { UserContext } from ".";
import { AuthContext } from "../../features/auth";

const useDisconnectUser = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { mutate } = useMutation("disconnectUser", () =>
    fetch(`${settings.get.server}${user.get.uri}/disconnect`, {
      method: "PATCH",
      headers: auth.newHeaders(user),
      keepalive: true,
    }).then((res) => res)
  );

  return {
    mutate,
  };
};

export default useDisconnectUser;
