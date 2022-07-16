import { useReducer } from 'react';

const useUser = () => {
  const baseUser = {
    uri: '',
    id: 0,
    name: '',
  };

  enum SettingsActionList {
    SET_URI = 'SET_URI',
    SET_NAME = 'SET_NAME',
  }

  const userReducer = (
    state: typeof baseUser,
    action: {
      type: keyof typeof SettingsActionList;
      payload: Partial<typeof baseUser>;
    },
  ) => {
    switch (action.type) {
      case SettingsActionList.SET_URI:
        if (!action.payload.uri) throw new Error('Missing uri');
        if (!action.payload.uri.split('/').pop()) throw new Error('Missing id in uri');

        return {
          ...state,
          uri: action.payload.uri,
          id: parseInt(action.payload.uri.split('/').pop() as string, 10),
        };
      case SettingsActionList.SET_NAME:
        if (!action.payload.name) throw new Error('Missing name');
        return {
          ...state,
          name: action.payload.name,
        };
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  const [get, dispatch] = useReducer(userReducer, baseUser);

  return { get, dispatch };
};

export default useUser;
