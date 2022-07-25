import * as R from 'ramda';
import { useReducer, createContext } from 'react';

const useRoom = () => {
  const baseRoom = {
    uri: "",
    id: 0,
    name: "",
  };

  const RoomError = (err: string) => new Error(`useRoom: ${err}`);

  enum RoomActionList {
    SET_URI_AND_ID = "SET_URI_AND_ID",
    SET_NAME = "SET_NAME",
  }

  const roomReducer = (
    state: typeof baseRoom,
    action: {
      type: keyof typeof RoomActionList;
      payload: Partial<typeof baseRoom>;
    }
  ) => {
    switch (action.type) {
      case RoomActionList.SET_URI_AND_ID: {
        const { uri } = action.payload;
        if (!uri) throw RoomError("missing uri");

        const id = Number(uri.split("/").pop());
        if (!id) throw RoomError("missing id in uri");

        return {
          ...state,
          uri,
          id,
        };
      }
      case RoomActionList.SET_NAME: {
        const { name } = action.payload;
        if (R.isNil(name)) throw RoomError("missing name");

        return {
          ...state,
          name,
        };
      }
      default:
        throw RoomError(`unhandled action type: ${action.type}`);
    }
  };

  const [get, dispatch] = useReducer(roomReducer, baseRoom);

  return { get, dispatch };
};

const RoomContext = createContext(null as any as ReturnType<typeof useRoom>);

export default useRoom;
export { RoomContext };
