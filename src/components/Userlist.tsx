import React from 'react';

const Userlist = ({ users }: { users: Array<string> }) => (
  <ul className="h-full overflow-auto">
    {users.map((user) => <li>{user}</li>)}
  </ul>
);

export default Userlist;
