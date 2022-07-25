import { Context, createContext } from "react";
import useUser from "../hooks/user";

const UserContext = createContext(null as any);

export default UserContext as Context<ReturnType<typeof useUser>>;
