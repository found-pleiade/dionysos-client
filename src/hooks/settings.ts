import { useReducer } from 'react';

const useSettings = () => {
  const initialSettings = {
    server: 'https://dionysos-test.yannlacroix.fr',
  };

  enum SettingsActionList {
    SET_SERVER = 'SET_SERVER',
    SET_SERVER_DEFAULT = 'SET_SERVER_DEFAULT',
  }

  const settingsReducer = (
    state: typeof initialSettings,
    action: {
      type: keyof typeof SettingsActionList;
      payload: Partial<typeof initialSettings>;
    },
  ) => {
    switch (action.type) {
      case SettingsActionList.SET_SERVER:
        if (!action.payload.server) throw new Error('Missing server');
        return {
          ...state,
          server: action.payload.server,
        };
      case SettingsActionList.SET_SERVER_DEFAULT:
        return {
          ...state,
          server: initialSettings.server,
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  const [get, dispatch] = useReducer(settingsReducer, initialSettings);

  return { get, dispatch };
};

export default useSettings;
