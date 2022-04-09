import * as R from 'ramda';
import { codes } from '../../constants';
import useConnection from '../../hooks/connection';
import useUsers from '../../hooks/users';
import { invalidInput, isValid, requestData } from '../../utils';
import { SendFunction } from '../../utils/types';

const changeUsername = (
  send: SendFunction,
  username: string,
) => {
  send(requestData(
    codes.request.changeUserName,
    { newUserName: username },
  ));
};

const usernameModalFunctions = ({
  connection, users, newUsername, setNewUsername,
}: {
  connection: ReturnType<typeof useConnection>,
  users: ReturnType<typeof useUsers>,
  newUsername: string,
  setNewUsername: React.Dispatch<React.SetStateAction<string>>,
}) => (modal: any) => ({
  save: (event: any) => {
    if (R.not(isValid(newUsername))) return;
    if (invalidInput(event)) return;
    changeUsername(connection.send, newUsername);
    users.setCurrent({ ...users.current, name: newUsername });
    modal.toggle();
  },
  cancel: () => {
    setNewUsername(users.current.name);
    modal.toggle();
  },
});

export default usernameModalFunctions;
