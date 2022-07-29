import { useReducer, createContext } from "react";

const useUser = () => {
  const baseUser = {
    uri: "",
    id: 0,
    name: "",
  };

  const actionTypes = Object.freeze({
    SET_URI_AND_ID: "SET_URI_AND_ID",
    SET_NAME: "SET_NAME",
  }); 

  // Specify the type of the payload based on the type
  type Action =
    | {
        type: typeof actionTypes["SET_URI_AND_ID"];
        payload: {
          uri: typeof baseUser.uri;
        };
      }
    | {
        type: typeof actionTypes["SET_NAME"];
        payload: {
          name: typeof baseUser.name;
        };
      };

  const reducer = (state: typeof baseUser, action: Action) => {
    switch (action.type) {
      case actionTypes["SET_URI_AND_ID"]: {
        const { uri } = action.payload;
        const id = Number(uri.split("/").pop());

        return {
          ...state,
          uri,
          id,
        };
      }
      case actionTypes["SET_NAME"]: {
        const { name } = action.payload;

        return {
          ...state,
          name,
        };
      }
    }
  };

  const [get, dispatch] = useReducer(reducer, baseUser);

  return { get, dispatch };
};

const UserContext = createContext(null as any as ReturnType<typeof useUser>);

export default useUser;
export { UserContext };
