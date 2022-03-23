import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import { idLength } from '../constants';
import { Room, User } from '../utils/types';

type userListProps = { users: Array<User>, room: Room, className: string };

const Userlist = ({ users, room, className }: userListProps) => {
  const star = (user: User) => (user.id === room.ownerId ? <StarIcon className="p-1 h-6 w-6" /> : <span />);

  return (
    <div className={`h-full ${className}`}>
      <ul className="h-fit">
        {users.map((user) => (
          <li key={user.id} className="pb-1 font-medium flex align-middle" title={user.id}>
            {`${user.name}`}
            <span className="text-foreground/40 font-normal">{`#${user.id.substring(0, idLength)}`}</span>
            {star(user)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Userlist;
