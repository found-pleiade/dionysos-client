import { PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import { codes } from '../constants';
import { requestData } from '../utils';
import { SendFunction, User } from '../utils/types';
import Id from './Id';

const changeUsername = (
  send: SendFunction,
  user: User,
  newUserName: string,
) => {
  send(requestData(
    codes.request.changeUserName,
    { newUserName, salt: user.salt },
  ));
};

const UserDisplay = ({ user, send }: { user: User, send: SendFunction }) => (
  <div>
    <button className="text-md flex items-center" onClick={() => changeUsername(send, user, 'Michel')} type="button">
      {user.name}
      {' '}
      <PencilAltIcon className="ml-2 h-5 w-4" />
    </button>
    <Id id={user.id} />
  </div>
);

export default UserDisplay;
