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
import { Room, User, DataType } from './utils/types';
import useErrors from './hooks/errors';

const send = (socket: WebSocket | undefined) => (data: DataType) => {
  if (R.not(R.isNil(socket))) {
    const definedSocket = socket as WebSocket;
    definedSocket.send(data);
  }
};

const App = () => {
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const url = useUrl(devServer);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [room, setRoom] = useState<Room>(defaultRoom);
  const [users, setUsers] = useState<Array<User>>([]);
  const errors = useErrors();

  useEffect(() => {
    setWebSocket(new WebSocket(devServer));
  }, []);

  useEffect(() => {
    if (R.isNil(webSocket)) return () => { };

    appWindow.listen('tauri://close-requested', () => {
      try {
        webSocket.close(1000);
        appWindow.close();
      } catch (e) {
        console.error(e);
      }
    });

    webSocket.onopen = (event) => {
      console.log('onopen: ', event);
      setIsConnected(true);
    };

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
        setRoom({ ...room, id: payload.roomId, ownerId: user.id });
        setUsers([user]);
      }

      if (code === codes.response.joinRoom) {
        setRoom({
          ...room,
          name: payload.roomName,
          id: payload.roomId,
          isPrivate: payload.isPrivate,
        });
      }

      if (code === codes.response.changeUserName) {
        setUser({ ...user, name: payload.username });
      }

      if (code === codes.response.newPeers) {
        setRoom({ ...room, ownerId: payload.ownerId });
        setUsers(payload.peers);
      }
    };

    webSocket.onerror = (event) => {
      console.log('onerror: ', event);
      errors.add(event as unknown as string);
    };

    webSocket.onclose = (event) => {
      console.log('onclose: ', event);
      setIsConnected(false);

      if (user.id.length > 0) {
        errors.add('Connection lost');
      }
    };

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
    />
  );

  return (
    <div className="text-foreground bg-background-800 h-screen cursor-default relative">
      <div className="z-50 absolute left-[50%] translate-x-[-50%] flex flex-col items-center min-w-[300px]">
        {errors.get.map((error) => <Error error={error} />)}
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
