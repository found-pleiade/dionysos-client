import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { Room, User } from '../utils/types';
import Id from './Id';

type userListProps = { users: Array<User>, room: Room, className: string };

const Userlist = ({ users, room, className }: userListProps) => {
  const star = (user: User) => (user.id === room.ownerId ? <StarIcon className="py-1 h-6 w-4" /> : <span />);

  return (
    <div className={`h-full ${className}`}>
      <ul className="h-fit">
        {users.map((user) => (
          <li key={user.id} className="pb-1 font-medium flex align-middle">
            {`${user.name}`}
            <Id id={user.id} short inline className="px-1" />
            {star(user)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Userlist;
