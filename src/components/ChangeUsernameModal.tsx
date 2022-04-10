import React from 'react';
import useUsers from '../hooks/users';
import { isValid } from '../utils';
import Button from './Button';
import Input from './Input';
import Modal from './Modal';
import SpaceBetween from './SpaceBetween';

const ChangeUsernameModal = ({ users }: {
  users: ReturnType<typeof useUsers>
}) => (
  <Modal modal={users.current.modal}>
    <Input id="changeUsername" placeholder="Username" value={users.current.newUsername} setValue={users.current.setNewUsername} onKeyPress={users.current.modal.save} />

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
