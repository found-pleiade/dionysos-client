import { createContext, useState } from "react";

const useUser = () => {
  const baseUser = {
    uri: "",
    id: 0,
  };

  const [user, setUser] = useState(baseUser);

  return { get: user, set: setUser };
};

const UserContext = createContext(null as any as ReturnType<typeof useUser>);

export default useUser;
export { UserContext };
