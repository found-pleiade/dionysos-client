import React, { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as R from 'ramda';
import { appWindow } from '@tauri-apps/api/window';
import Error from './components/Error';
import {
  codes, defaultRoom, defaultUser, devServer,
} from './constants';
import useUrl from './hooks/url';
import Connect from './pages/connect';
import Home from './pages/home';
import {
  Room, User, DataType, SendFunction, JoinRequest,
} from './utils/types';
import useErrors from './hooks/errors';
import { isValid, notNil } from './utils';
import useModal from './hooks/modal';

/**
 * Two use function that first set the WebSocket to use then the data to send
 * to the WebSocket.
 */
const send = (socket: WebSocket | undefined): SendFunction => (data: DataType): void => {
  if (notNil(socket)) {
    const definedSocket = socket as WebSocket;
    definedSocket.send(data);
  }
};

/**
 * App main function, here lies most states and every WebSocket listeners.
 * Returns the shell style, app router and errors.
 */
const App = () => {
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const url = useUrl(devServer);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [room, setRoom] = useState<Room>(defaultRoom);
  const [users, setUsers] = useState<Array<User>>([]);
  const errors = useErrors();
  const joinRequestModal = useModal();
  const [joinRequests, setJoinRequests] = useState<Array<JoinRequest>>([]);
  const [pendingRoom, setPendingRoom] = useState<Room>(defaultRoom);

  // Set the WebSocket to use on app start.
  // Listen for the app closing to close the WebSocket.
  useEffect(() => {
    try {
      const socket = new WebSocket(devServer);
      setWebSocket(socket);

      appWindow.listen('tauri://close-requested', () => {
        if (notNil(webSocket)) {
          const definedSocket = webSocket as WebSocket;
          definedSocket.close(1000);
        }
        appWindow.close();
      });
    } catch (e: unknown) {
      const knowError = e as Error;
      errors.add(knowError.message);
    }
  }, []);

  // Every WebSocket listeners, only refreshed with key app state change.
  useEffect(() => {
    if (R.isNil(webSocket)) return () => { };

    // Connection is up.
    webSocket.onopen = (event) => {
      console.log('onopen: ', event);
      setIsConnected(true);
      send(webSocket)(user.uuid);
    };

    // Server is sending data.
    webSocket.onmessage = (event) => {
      const { data } = event;
      const { code, payload } = JSON.parse(data);
      console.log(code, payload);

      if (code === codes.response.error) {
        errors.add(payload.error);
      }

      if (code === codes.response.connection) {
        setUser({ ...user, id: payload.userId });
      }

      if (code === codes.response.roomCreation) {
        errors.clear();
        setRoom({
          ...room,
          id: payload.roomId,
          ownerId: user.id,
        });
        setUsers([user]);
      }

      if (code === codes.response.joinRoom) {
        if (!payload.isPrivate) {
          setRoom({
            ...room,
            name: payload.roomName,
            id: payload.roomId,
            isPrivate: payload.isPrivate,
          });
        }

        if (payload.isPrivate) {
          errors.add('Waiting for the host...', 9999);

          setPendingRoom({
            ...room,
            name: payload.roomName,
            id: payload.roomId,
            isPrivate: payload.isPrivate,
          });
        }
      }

      if (code === codes.response.denied) {
        if (payload.requestCode === codes.request.joinRoom) {
          errors.clear('Connection to the room denied by the host.');
        }
      }

      if (code === codes.response.quitRoom) {
        errors.clear();
        setRoom(defaultRoom);
        setUsers([]);
      }

      if (code === codes.response.changeUserName && isValid(room.name)) {
        errors.clear();
        setUser({ ...user, name: payload.username });
      }

      if (code === codes.response.newPeers) {
        errors.clear();
        setRoom({ ...room, ownerId: payload.ownerId });
        setUsers(payload.peers);

        if (pendingRoom.isPrivate) {
          setRoom(pendingRoom);
          setPendingRoom(defaultRoom);
        }
      }

      if (code === codes.response.joinRequest) {
        if (joinRequests.length === 0) {
          joinRequestModal.toggle();
        }
        setJoinRequests(joinRequests.concat({
          requesterId: payload.requesterId,
          requesterUsername: payload.requesterUsername,
          roomId: payload.roomId,
        }));
      }
    };

    // Connection errors.
    webSocket.onerror = (event) => {
      console.log('onerror: ', event);
    };

    // Connection is closed.
    webSocket.onclose = (event) => {
      console.log('onclose: ', event);
      setIsConnected(false);

      if (user.id.length > 0) {
        errors.add('Connection lost');
      }
    };

    // Reset listeners on unmount.
    return () => {
      webSocket.onopen = null;
      webSocket.onmessage = null;
      webSocket.onerror = null;
      webSocket.onclose = null;
    };
  }, [user, room, errors, webSocket]);

  const connect = (
    <Connect
      send={send(webSocket)}
      user={user}
      setUser={setUser}
      isConnected={isConnected}
      setIsConnected={setIsConnected}
      url={url}
      setWebSocket={setWebSocket}
      errors={errors}
    />
  );

  const home = (
    <Home
      user={user}
      setUser={setUser}
      users={users}
      room={room}
      setRoom={setRoom}
      send={send(webSocket)}
      joinRequestModal={joinRequestModal}
      joinRequests={joinRequests}
      setJoinRequests={setJoinRequests}
    />
  );

  return (
    <div className="text-foreground bg-background-800 h-screen cursor-default relative">
      <div className="z-50 absolute left-[50%] translate-x-[-50%] flex flex-col items-center min-w-[300px]">
        {errors.get.map((error) => <Error error={error.message} duration={error.duration} />)}
      </div>

      <MemoryRouter>
        <Routes>
          <Route path="/" element={connect} />
          <Route path="/home" element={home} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
