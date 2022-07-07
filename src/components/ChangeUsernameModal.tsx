import React from 'react';
import useUsers from '../hooks/users';
import { isValid } from '../utils';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import SpaceBetween from './SpaceBetween';

const ChangeUsernameModal = ({ users, className }: {
  users: ReturnType<typeof useUsers>,
  className?: string
}) => (
  <Modal modal={users.current.modal} className={className}>
    <Input id="changeUsername" placeholder="Username" value={users.current.newUsername} setValue={users.current.setNewUsername} onKeyDown={users.current.modal.save} />

    <SpaceBetween>
      <Button onClick={users.current.modal.cancel} colorless>Cancel</Button>
      <Button
        onClick={users.current.modal.save}
        disabled={!isValid(users.current.newUsername)}
      >
        Save
      </Button>
    </SpaceBetween>
  </Modal>
);

export default ChangeUsernameModal;
