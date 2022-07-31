import { createContext, useState } from "react";
import useUser from "../states/user";

const useAuth = () => {
  const [password, setPassword] = useState("");

  const newHeaders = (
    user: Pick<ReturnType<typeof useUser>, "get">,
    headers = {} as Headers
  ) =>
    new Headers({
      ...headers,
      Authorization: `Basic ${window.btoa(`${user.get.id}:${password}`)}`,
    });

  return {
    setPassword,
    newHeaders,
  };
};

const AuthContext = createContext(null as any as ReturnType<typeof useAuth>);

export default useAuth;
export { AuthContext };
