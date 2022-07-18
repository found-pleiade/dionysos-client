import * as R from 'ramda';
import { useReducer } from 'react';

const useUser = () => {
  const baseUser = {
    uri: '',
    id: 0,
    name: '',
  };

  enum SettingsActionList {
    SET_URI_AND_ID = 'SET_URI_AND_ID',
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
      case SettingsActionList.SET_URI_AND_ID: {
        const { uri } = action.payload;
        if (!uri) throw new Error('Missing uri');

        const id = Number(uri.split('/').pop());
        if (!id) throw new Error('Missing id in uri');

        return {
          ...state,
          uri,
          id,
        };
      }
      case SettingsActionList.SET_NAME: {
        const { name } = action.payload;
        if (R.isNil(name)) throw new Error('Missing name');

        return {
          ...state,
          name,
        };
      }
      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  };

  const [get, dispatch] = useReducer(userReducer, baseUser);

  return { get, dispatch };
};

export default useUser;
