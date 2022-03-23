import { PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import { ModalType, User } from '../utils/types';
import Id from './Id';

type UserDisplayProps = { user: User, modal: ModalType };

const UserDisplay = ({ user, modal }: UserDisplayProps) => (
  <div className="flex justify-between">
    <button className="text-md font-medium flex items-center" onClick={() => modal.toggle()} type="button">
      {user.name}
      <Id id={user.id} short inline className="px-1 cursor-pointer" />
      <PencilAltIcon className="h-5 w-4" />
    </button>
  </div>
);

export default UserDisplay;
