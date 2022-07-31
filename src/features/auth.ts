import { createContext, useState } from "react";
import useUser from "../states/user";

// Basic auth where you get a password on user
// creation that you add in the headers of
// requests.
const useAuth = () => {
  const [password, setPassword] = useState("");
  
  // Headers abstraction that handle auth.
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
