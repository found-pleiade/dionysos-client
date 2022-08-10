import { useContext } from "react";
import { useMutation } from "react-query";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";
import { AuthContext } from "../../features/auth";
import { ShareContext } from "../../features/shareRoom";

const useDisconnectUser = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const share = useContext(ShareContext);

  const { mutate } = useMutation("disconnectUser", () =>
    fetch(`${settings.get.server}/rooms/${share.id}/disconnect`, {
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
