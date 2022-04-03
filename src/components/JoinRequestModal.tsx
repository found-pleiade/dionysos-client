import React, { useEffect, useRef, useState } from 'react';
import { codes } from '../constants';
import useConnection from '../hooks/connection';
import useModal from '../hooks/modal';
import useRoom from '../hooks/room';
import {
  preventDialogEscape, requestData, toggleDialog,
} from '../utils';
import { JoinRequest } from '../utils/types';
import Button from './Button';
import Id from './Id';

/**
 * Setup the request for accepting or refusing a user joining a private room.
 */
const requestJRA = (requesterid: string, accepted: boolean) => requestData(
  codes.request.joinRoomAnswer,
  { requesterid, accepted },
);

const filterAnsweredRequests = (
  requests: Array<JoinRequest>,
  id: string,
) => requests.filter((x) => x.requesterId !== id);

type ConnectModalProps = {
  connection: ReturnType<typeof useConnection>,
  modal: ReturnType<typeof useModal>,
  room: ReturnType<typeof useRoom>,
  requests: Array<JoinRequest>,
  setRequests: React.Dispatch<React.SetStateAction<Array<JoinRequest>>>,
}

const JoinRequestModal = ({
  connection, modal, room, requests, setRequests,
}: ConnectModalProps) => {
  const [currentRequest, setCurrentRequest] = useState({ requesterId: '', requesterUsername: '', roomId: '' });

  const handleRequest = (accepted: boolean) => () => {
    connection.send(requestJRA(currentRequest.requesterId, accepted));
    const filteredRequests = filterAnsweredRequests(requests, currentRequest.requesterId);
    setRequests(filteredRequests);
    if (filteredRequests.length === 0) modal.toggle();
  };

  useEffect(() => {
    if (requests.length > 0) {
      setCurrentRequest(requests[0]);
    }
  }, [requests]);

  const dialogRef = useRef() as any;
  useEffect(() => {
    preventDialogEscape(dialogRef);
    toggleDialog(modal.isOpen && room.current.isPrivate, dialogRef);
  }, [modal]);

  return (
    <dialog ref={dialogRef} className="min-w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6 text-foreground">
      <p className="font-medium">
        {currentRequest.requesterUsername}
        {' '}
        <Id id={currentRequest.requesterId} short inline />
        {' '}
        wants to join your room.
      </p>

      <div className="flex justify-between">
        <Button id="refuseJoinRequest" text="Refuse" colorless onClick={handleRequest(false)} />
        <Button id="acceptJoinRequest" text="Accept" colorless onClick={handleRequest(true)} />
      </div>
    </dialog>
  );
};

export default JoinRequestModal;
