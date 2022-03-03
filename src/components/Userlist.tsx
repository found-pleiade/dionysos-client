import React from 'react';
import { User } from '../utils/types';

type userListProps = { users: Array<User>, className: string };

const Userlist = ({ users, className }: userListProps) => (
  <div className={`h-full ${className}`}>
    <h2 className="text-xl pb-3">Members</h2>
    <ul className="h-fit">
      {users.map((user) => (
        <li key={user.id} className="pb-1" title={user.id}>
          {`${user.name}`}
          <span className="text-neutral-400">{`#${user.id.substring(0, 4)}`}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default Userlist;
