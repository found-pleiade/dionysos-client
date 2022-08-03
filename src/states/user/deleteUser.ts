import { useContext } from "react";
import { useMutation } from "react-query";
import { SettingsContext } from "../settings";
import { UserContext } from ".";
import { AuthContext } from "../../features/auth";

const useDeleteUser = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { mutate } = useMutation("deleteUser", () =>
    fetch(`${settings.get.server}${user.get.uri}`, {
      method: "DELETE",
      headers: auth.newHeaders(user),
      keepalive: true,
    }).then((res) => res)
  );

  return {
    mutate,
  };
};

export default useDeleteUser;
