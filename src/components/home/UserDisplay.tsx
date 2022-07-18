import React, { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import Button from '../Button';

/**
 * Display the user's name.
 */
const UserDisplay = ({
  className,
  onClick,
}: {
  className?: string,
  onClick?: () => void,
}) => {
  const user = useContext(UserContext);

  return (
    <Button headless onClick={onClick} className={className}>
      {user.get.name}
    </Button>
  );
};

export default UserDisplay;
