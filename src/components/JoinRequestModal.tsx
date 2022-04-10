import React from 'react';
import useJoinRequests from '../hooks/joinRequests';
import Button from './Button';
import Id from './Id';
import Modal from './Modal';
import SpaceBetween from './SpaceBetween';

const JoinRequestModal = ({ joinRequests }: {
  joinRequests: ReturnType<typeof useJoinRequests>
}) => (
  <Modal modal={joinRequests.modal}>
    <p className="font-medium text-lg">
      {joinRequests.current.requesterUsername}
      <Id id={joinRequests.current.requesterId} className="px-1" short inline />
      wants to join your room.
    </p>

    <SpaceBetween>
      <Button colorless onClick={joinRequests.answer(false)}>Refuse</Button>
      <Button colorless onClick={joinRequests.answer(true)}>Accept</Button>
    </SpaceBetween>
  </Modal>
);

export default JoinRequestModal;
