import { useReducer, createContext } from "react";

enum ActionTypes {
  SET_SERVER = "SET_SERVER",
  SET_SERVER_DEFAULT = "SET_SERVER_DEFAULT",
  SET_PASSWORD = "SET_PASSWORD",
}

const useSettings = () => {
  const initialSettings = {
    server: "https://dionysos-test.yannlacroix.fr/api/v0",
    password: "",
  };

  // Specify the type of the payload based on the type
  type Action =
    | {
        type: ActionTypes.SET_SERVER;
        payload: {
          server: typeof initialSettings.server;
        };
      }
    | {
        type: ActionTypes.SET_SERVER_DEFAULT;
        payload: Record<string, never>;
      }
    | {
        type: ActionTypes.SET_PASSWORD;
        payload: {
          password: typeof initialSettings.password;
        };
      };

  const reducer = (state: typeof initialSettings, action: Action) => {
    switch (action.type) {
      case ActionTypes.SET_SERVER: {
        const { server } = action.payload;

        return {
          ...state,
          server,
        };
      }
      case ActionTypes.SET_SERVER_DEFAULT:
        return {
          ...state,
          server: initialSettings.server,
        };
      case ActionTypes.SET_TOKEN: {
        const { token } = action.payload;

        return {
          ...state,
          token,
        };
      }
    }
  };

  const [get, dispatch] = useReducer(reducer, initialSettings);

  return { get, dispatch };
};

const SettingsContext = createContext(
  null as any as ReturnType<typeof useSettings>
);

export default useSettings;
export { SettingsContext, ActionTypes };
