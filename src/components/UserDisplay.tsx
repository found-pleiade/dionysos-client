import { PencilAltIcon } from '@heroicons/react/solid';
import React from 'react';
import useUsers from '../hooks/users';
import Id from './Id';

/**
 * Display the user's name and id.
 */
const UserDisplay = ({ users }: {
  users: ReturnType<typeof useUsers>,
}) => (
  <button className="text-md font-medium flex items-center w-min" onClick={() => users.current.modal.toggle()} type="button" title="Change your username">
    {users.current.get.name}
    <Id id={users.current.get.id} short inline className="px-1 cursor-pointer" />
    <PencilAltIcon className="h-5 w-4" />
  </button>
);

export default UserDisplay;
