import React, { useEffect, useState } from 'react';
import { codes } from '../constants';
import { requestData, visibility } from '../utils';
import {
  JoinRequest, ModalType, Room, SendFunction,
} from '../utils/types';
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
  modal: ModalType,
  room: Room,
  requests: Array<JoinRequest>,
  setRequests: React.Dispatch<React.SetStateAction<Array<JoinRequest>>>,
  send: SendFunction,
}

const JoinRequestModal = ({
  modal, room, requests, setRequests, send,
}: ConnectModalProps) => {
  const [currentRequest, setCurrentRequest] = useState({ requesterId: '', requesterUsername: '', roomId: '' });

  const handleRequest = (accepted: boolean) => () => {
    send(requestJRA(currentRequest.requesterId, accepted));
    const filteredRequests = filterAnsweredRequests(requests, currentRequest.requesterId);
    setRequests(filteredRequests);
    if (filteredRequests.length === 0) modal.toggle();
  };

  useEffect(() => {
    if (requests.length > 0) {
      setCurrentRequest(requests[0]);
    }
  }, [requests]);

  return (
    <div role="none" className={`${visibility(modal.isShowing && room.isPrivate)} modalBackground absolute left-0 top-0 h-screen w-screen bg-background-900/60 z-[100] flex justify-center items-center`}>
      <div className="min-w-[55ch] p-6 first-letter:space-y-6 bg-background-700 rounded-md relative space-y-6">
        <p className="font-medium">
          {currentRequest.requesterUsername}
          {' '}
          <Id id={currentRequest.requesterId} short inline />
          {' '}
          wants to join your room.
        </p>

        <div className="flex justify-between">
          <Button id="refuseJoinRequest" text="Refuse" onClick={handleRequest(false)} />
          <Button id="acceptJoinRequest" text="Accept" onClick={handleRequest(true)} />
        </div>
      </div>
    </div>
  );
};

export default JoinRequestModal;
