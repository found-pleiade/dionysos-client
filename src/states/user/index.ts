import { useReducer, createContext } from "react";

enum ActionTypes {
  SET_URI_AND_ID = "SET_URI_AND_ID",
  SET_NAME = "SET_NAME",
}

const useUser = () => {
  const baseUser = {
    uri: "",
    id: 0,
  };

  // Specify the type of the payload based on the type
  type Action = {
    type: ActionTypes.SET_URI_AND_ID;
    payload: {
      uri: typeof baseUser.uri;
    };
  };

  const reducer = (state: typeof baseUser, action: Action) => {
    switch (action.type) {
      case ActionTypes.SET_URI_AND_ID: {
        const { uri } = action.payload;
        const id = Number(uri.split("/").pop());

        return {
          ...state,
          uri,
          id,
        };
      }
    }
  };

  const [get, dispatch] = useReducer(reducer, baseUser);

  return { get, dispatch };
};

const UserContext = createContext(null as any as ReturnType<typeof useUser>);

export default useUser;
export { UserContext, ActionTypes };
