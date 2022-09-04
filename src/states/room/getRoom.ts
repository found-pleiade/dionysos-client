import { useContext } from "react";
import { useQuery } from "react-query";
import { SettingsContext } from "../settings";
import { UserContext } from "../user";
import { AuthContext } from "../../features/auth";
import { ShareContext } from "../../features/shareRoom";

const useGetRoom = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);
  const share = useContext(ShareContext);

  const { isLoading, error, data, refetch } = useQuery(
    "getRoom",
    () =>
      fetch(`${settings.get.server}/rooms/${share.id}`, {
        headers: auth.newHeaders(user),
      }).then((res) => res.json()),
    {
      enabled: false,
    }
  );

  return {
    isLoading,
    error,
    data,
    refetch,
  };
};

export default useGetRoom;
