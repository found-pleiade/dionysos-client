import React, { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Error from './components/Error';
import {
  codes, defaultRoom, defaultUser, devServer,
} from './constants';
import Connect from './pages/connect';
import Home from './pages/home';
import { Room, User, dataType } from './utils/types';

const send = (socket: WebSocket) => (data: dataType) => socket.send(data);

const App = () => {
  const [webSocket, setWebSocket] = useState(new WebSocket(devServer));
  const [serverUrl, setServerUrl] = useState(devServer);
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [room, setRoom] = useState<Room>(defaultRoom);
  const [users, setUsers] = useState<Array<User>>([]);
  const [errors, setErrors] = useState<Array<string>>([]);

  useEffect(() => {
    setWebSocket(new WebSocket(serverUrl));
  }, [serverUrl]);

  useEffect(() => {
    webSocket.onopen = (event) => {
      console.log('onopen: ', event);
      setIsConnected(true);
    };

    webSocket.onmessage = (event) => {
      const { data } = event;
      const { code, payload } = JSON.parse(data);
      console.log(code, payload);

      if (code === codes.response.error) {
        setErrors(errors.concat(payload.error));
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

      if (code === codes.response.newPeers) {
        setRoom({ ...room, ownerId: payload.ownerId });
        setUsers(payload.peers);
      }
    };

    webSocket.onerror = (event) => {
      console.log('onerror: ', event);
    };

    webSocket.onclose = (event) => {
      console.log('onclose: ', event);
      setIsConnected(false);
    };
  }, [user, room, errors, webSocket]);

  const connect = (
    <Connect
      send={send(webSocket)}
      user={user}
      setUser={setUser}
      serverUrl={serverUrl}
      setServerUrl={setServerUrl}
      isConnected={isConnected}
    />
  );
  const home = (
    <Home
      user={user}
      users={users}
      room={room}
      setRoom={setRoom}
      send={send(webSocket)}
    />
  );

  return (
    <div className="text-neutral-50 bg-neutral-900 h-screen cursor-default">
      <div className="z-10 absolute left-[50%] translate-x-[-50%] flex flex-col items-center min-w-[300px]">
        {errors.map((error) => <Error error={error} />)}
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
