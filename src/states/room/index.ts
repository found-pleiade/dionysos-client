import { useReducer, createContext } from "react";

enum ActionTypes {
  SET_URI_AND_ID = "SET_URI_AND_ID",
  SET_NAME = "SET_NAME",
}

const useRoom = () => {
  const baseRoom = {
    uri: "",
    id: 0,
    name: "",
  };

  // Specify the type of the payload based on the type
  type Action =
    | {
        type: ActionTypes.SET_URI_AND_ID;
        payload: {
          uri: typeof baseRoom.uri;
        };
      }
    | {
        type: ActionTypes.SET_NAME;
        payload: Record<string, never>;
      };

  const reducer = (state: typeof baseRoom, action: Action) => {
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
      case ActionTypes.SET_NAME: {
        const { name } = action.payload;

        return {
          ...state,
          name,
        };
      }
    }
  };

  const [get, dispatch] = useReducer(reducer, baseRoom);

  return { get, dispatch };
};

const RoomContext = createContext(null as any as ReturnType<typeof useRoom>);

export default useRoom;
export { RoomContext, ActionTypes };
