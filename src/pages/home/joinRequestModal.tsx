import { codes } from '../../constants';
import useConnection from '../../hooks/connection';
import useModal from '../../hooks/modal';
import { requestData } from '../../utils';
import { JoinRequest } from '../../utils/types';

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

const handleRequest = (
  {
    connection, joinRequestModal, currentRequest, joinRequests, setJoinRequests,
  }: {
    connection: ReturnType<typeof useConnection>,
    joinRequestModal: ReturnType<typeof useModal>,
    currentRequest: JoinRequest,
    joinRequests: Array<JoinRequest>,
    setJoinRequests: React.Dispatch<React.SetStateAction<Array<JoinRequest>>>,
  },
) => (accepted: boolean) => () => {
  connection.send(requestJRA(currentRequest.requesterId, accepted));
  const filteredRequests = filterAnsweredRequests(joinRequests, currentRequest.requesterId);
  setJoinRequests(filteredRequests);
  if (filteredRequests.length === 0) joinRequestModal.toggle();
};

export default handleRequest;
