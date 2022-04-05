import { PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import useModal from '../hooks/modal';
import useUsers from '../hooks/users';
import Id from './Id';

type UserDisplayProps = {
  users: ReturnType<typeof useUsers>,
  modal: ReturnType<typeof useModal>
};

/**
 * Display the user's name and id.
 */
const UserDisplay = ({ users, modal }: UserDisplayProps) => (
  <button className="text-md font-medium flex items-center w-min" onClick={() => modal.toggle()} type="button" title="Change your username">
    {users.current.name}
    <Id id={users.current.id} short inline className="px-1 cursor-pointer" />
    <PencilAltIcon className="h-5 w-4" />
  </button>
);

export default UserDisplay;
