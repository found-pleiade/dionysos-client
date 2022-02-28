import React from 'react';

const Userlist = ({ users }: { users: Array<{ id: number, name: string }> }) => (
  <div className="h-full overflow-auto">
    <h2 className="text-2xl pb-3">Members</h2>
    <ul className="text-neutral-400">
      {users.map((user) => <li key={user.id} className="pb-1">{user.name}</li>)}
    </ul>
  </div>
);

export default Userlist;
