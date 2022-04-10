import { useEffect, useState } from 'react';
import { codes } from '../constants';
import { requestData } from '../utils';
import { JoinRequest } from '../utils/types';
import useConnection from './connection';
import useModal from './modal';

const useJoinRequests = (connection: ReturnType<typeof useConnection>) => {
  const modal = useModal();
  const [requests, setRequests] = useState<Array<JoinRequest>>([]);
  const [currentRequest, setCurrentRequest] = useState({ requesterId: '', requesterUsername: '', roomId: '' });

  const filterAnswered = () => requests.filter(
    (x) => x.requesterId !== currentRequest.requesterId,
  );

  const closeModalIfEmpty = (filteredRequests: Array<JoinRequest>) => {
    if (filteredRequests.length === 0) modal.toggle();
  };

  const answer = (response: boolean) => () => {
    connection.send(requestData(
      codes.request.joinRoomAnswer,
      { requesterId: currentRequest.requesterId, accepted: response },
    ));
    const filteredRequests = filterAnswered();
    setRequests(filteredRequests);
    closeModalIfEmpty(filteredRequests);
  };

  useEffect(() => {
    if (requests.length > 0) setCurrentRequest(requests[0]);
  }, [requests]);

  return {
    modal,
    get: requests,
    set: setRequests,
    current: currentRequest,
    setCurrent: setCurrentRequest,
    answer,
  };
};

export default useJoinRequests;
