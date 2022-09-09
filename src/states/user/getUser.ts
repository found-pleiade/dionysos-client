import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { SettingsContext } from "../settings";
import { UserContext } from ".";
import { AuthContext } from "../../features/auth";

const useGetUser = () => {
  const settings = useContext(SettingsContext);
  const user = useContext(UserContext);
  const auth = useContext(AuthContext);

  const { isLoading, error, data } = useQuery(["getUser"], () =>
    fetch(`${settings.get.server}${user.get.uri}`, {
      headers: auth.newHeaders(user),
    }).then((res) => res.json())
  );

  return {
    isLoading,
    error,
    data,
  };
};

export default useGetUser;
