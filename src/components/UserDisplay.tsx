import { PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import { ModalType, SendFunction, User } from '../utils/types';
import Id from './Id';

type UserDisplayProps = { user: User, modal: ModalType, send: SendFunction };

const UserDisplay = ({ user, modal, send }: UserDisplayProps) => (
  <div>
    <button className="text-md font-medium flex items-center" onClick={() => modal.toggle()} type="button">
      {user.name}
      {' '}
      <PencilAltIcon className="ml-2 h-5 w-4" />
    </button>
    <Id id={user.id} />
  </div>
);

export default UserDisplay;
