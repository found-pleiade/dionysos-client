import React, { useEffect, useRef, useState } from 'react';
import Videojs from '../../components/Videojs';
import { JoinRequest } from '../../utils/types';
import OverlayMenu from '../../components/OverlayMenu';
import Panel from '../../components/Panel';
import useSideMenu from '../../hooks/sideMenu';
import useConnection from '../../hooks/connection';
import useModal from '../../hooks/modal';
import useRoom from '../../hooks/room';
import useUsers from '../../hooks/users';
import useHelp from '../../hooks/help';
import RoomInputGroup from '../../components/RoomInputGroup';
import Help from '../../components/Help';
import RoomDisplay from '../../components/RoomDisplay';
import Userlist from '../../components/Userlist';
import UserDisplay from '../../components/UserDisplay';
import Chat from '../../components/Chat';
import SpaceBetween from '../../components/SpaceBetween';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Input from '../../components/Input';
import { isValid } from '../../utils';
import usernameModalFunctions from './usernameModal';
import Id from '../../components/Id';
import handleRequest from './joinRequestModal';

const Home = ({
  connection,
  users,
  room,
  joinRequestModal,
  joinRequests,
  setJoinRequests,
}: {
  connection: ReturnType<typeof useConnection>,
  users: ReturnType<typeof useUsers>,
  room: ReturnType<typeof useRoom>,
  joinRequestModal: ReturnType<typeof useModal>,
  joinRequests: Array<JoinRequest>,
  setJoinRequests: React.Dispatch<React.SetStateAction<Array<JoinRequest>>>,
}) => {
  /**
   * State of the visibility of the panel, help, chat and modal.
   */
  const panel = useSideMenu(true);
  const chat = useSideMenu(false);
  const help = useHelp(false);

  const [newUsername, setNewUsername] = useState(users.current.name);
  const usernameModalRef = useRef() as any;
  const usernameModal = useModal(usernameModalFunctions({
    connection,
    users,
    newUsername,
    setNewUsername,
  }));

  const joinRequestModalRef = useRef() as any;
  const [currentRequest, setCurrentRequest] = useState({ requesterId: '', requesterUsername: '', roomId: '' });
  const request = handleRequest({
    connection,
    joinRequestModal,
    currentRequest,
    joinRequests,
    setJoinRequests,
  });

  const roomNotEmpty = room.current.name !== '' && room.current.id !== '';
  const emptyUserList = users.get.length <= 0;

  useEffect(() => {
    if (joinRequests.length > 0) setCurrentRequest(joinRequests[0]);
  }, [joinRequests]);

  return (
    <>
      <Modal modalRef={usernameModalRef} modal={usernameModal}>
        <Input id="changeUsername" placeholder="Username" value={newUsername} setValue={setNewUsername} onKeyPress={usernameModal.save} />

        <SpaceBetween>
          <Button onClick={usernameModal.cancel} colorless>Cancel</Button>
          <Button onClick={usernameModal.save} disabled={!isValid(newUsername)}>Save</Button>
        </SpaceBetween>
      </Modal>

      <Modal modalRef={joinRequestModalRef} modal={joinRequestModal}>
        <p className="font-medium text-lg">
          {currentRequest.requesterUsername}
          <Id id={currentRequest.requesterId} className="px-1" short inline />
          wants to join your room.
        </p>

        <SpaceBetween>
          <Button id="refuseJoinRequest" colorless onClick={request(false)}>Refuse</Button>
          <Button id="acceptJoinRequest" colorless onClick={request(true)}>Accept</Button>
        </SpaceBetween>
      </Modal>

      <div className="h-screen w-screen truncate bg-black flex">
        <Panel state={panel}>
          <RoomInputGroup
            connection={connection}
            room={room}
            visible={!roomNotEmpty}
            help={help}
          />

          <Help visible={help.isOpen} />

          <RoomDisplay
            room={room}
            connection={connection}
            visible={roomNotEmpty}
          />

          <Userlist
            users={users}
            room={room}
            visible={!emptyUserList}
          />

          <UserDisplay users={users} modal={usernameModal} />
        </Panel>

        <Chat state={chat}>
          <p>Ceci est un chat</p>
        </Chat>

        {/* Video */}
        <div className="relative w-[-webkit-fill-available] h-screen flex items-center justify-center">
          {/* Player */}
          <div className="video-max-width mx-auto w-[inherit]">
            <Videojs
              options={{}}
              onReady={() => { }}
            />
          </div>

          {/* Menus */}
          <OverlayMenu panel={panel} chat={chat} />
        </div>
      </div>
    </>
  );
};

export default Home;
