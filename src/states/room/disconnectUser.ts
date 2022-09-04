import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";
import { AuthContext } from "../../features/auth";

const useDisconnectUser = (shareId: string) => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { mutate } = useMutation(["disconnectUser"], () =>
    fetch(`${settings.get.server}/rooms/${shareId}/disconnect`, {
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
