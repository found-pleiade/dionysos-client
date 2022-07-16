import { useReducer } from 'react';

const useUser = () => {
  const baseUser = {
    uri: '',
    id: '',
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
        return {
          ...state,
          uri: action.payload.uri,
          id: action.payload.uri.split('/').pop() as string,
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
