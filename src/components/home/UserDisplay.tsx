import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

/**
 * Display the user's name.
 */
const UserDisplay = () => {
  const user = useContext(UserContext);

  return (
    <div className="text-md font-medium flex items-center w-min">
      <p>{user.get.name}</p>
    </div>
  );
};

export default UserDisplay;
