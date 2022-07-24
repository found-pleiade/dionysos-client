import * as R from "ramda";
import { useReducer } from "react";

const useUser = () => {
  const baseUser = {
    uri: "",
    id: 0,
    name: "",
  };

  enum UserActionList {
    SET_URI_AND_ID = "SET_URI_AND_ID",
    SET_NAME = "SET_NAME",
  }

  const UserError = (err: string) => new Error(`useUser: ${err}`);

  const userReducer = (
    state: typeof baseUser,
    action: {
      type: keyof typeof UserActionList;
      payload: Partial<typeof baseUser>;
    }
  ) => {
    switch (action.type) {
      case UserActionList.SET_URI_AND_ID: {
        const { uri } = action.payload;
        if (!uri) throw UserError("missing uri");

        const id = Number(uri.split("/").pop());
        if (!id) throw UserError("missing id in uri");

        return {
          ...state,
          uri,
          id,
        };
      }
      case UserActionList.SET_NAME: {
        const { name } = action.payload;
        if (R.isNil(name)) throw UserError("missing name");

        return {
          ...state,
          name,
        };
      }
      default:
        throw UserError(`unhandled action type: ${action.type}`);
    }
  };

  const [get, dispatch] = useReducer(userReducer, baseUser);

  return { get, dispatch };
};

export default useUser;
