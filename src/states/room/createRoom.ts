import { useContext } from "react";
import { useQuery } from "react-query";
import { AuthContext } from "../../features/auth";
import { ShareContext } from "../../features/shareRoom";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";

const useCreateRoom = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const share = useContext(ShareContext);

  const { isLoading, error, data } = useQuery("createRoom", () => {
    if (share.isJoining) return;
    return fetch(`${settings.get.server}/rooms`, {
      headers: auth.newHeaders(user),
      method: "POST",
      body: JSON.stringify({
        name: "miaou",
      }),
    }).then((res) => res.json());
  });

  return {
    isLoading,
    error,
    data,
  };
};

export default useCreateRoom;
