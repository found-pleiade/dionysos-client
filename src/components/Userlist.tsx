import { StarIcon } from '@heroicons/react/solid';
import React from 'react';
import useRoom from '../hooks/room';
import useUsers from '../hooks/users';
import { visibility } from '../utils';
import { User } from '../utils/types';
import Id from './Id';
import Separator from './Separator';

const Userlist = ({ users, room, visible }: {
  users: ReturnType<typeof useUsers>,
  room: ReturnType<typeof useRoom>,
  visible: boolean
}) => {
  /**
   * Return a star icon if the user is the room owner. Return a span otherwise.
   */
  const star = (user: User) => (user.id === room.current.ownerId ? <StarIcon className="py-1 h-6 w-4" /> : <span />);

  return (
    <>
      <Separator visible={visible} />
      <ul className={`h-full ${visibility(visible)}`}>
        {users.get.map((user) => (
          <li key={user.id} className="pb-1 font-medium flex align-middle">
            {`${user.name}`}
            <Id id={user.id} short inline className="px-1" />
            {star(user)}
          </li>
        ))}
      </ul>
      <Separator visible={visible} />
    </>
  );
};

export default Userlist;
