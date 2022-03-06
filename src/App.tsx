import React, { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { v4 as salt } from 'uuid';
import Error from './components/Error';
import Connect from './pages/connect';
import Home from './pages/home';
import { Room, User, dataType } from './utils/types';

const send = (socket: WebSocket) => (data: dataType) => socket.send(data);

const socket = new WebSocket('wss://dionysos-test.yannlacroix.fr');

const defaultUser = {
  id: '',
  salt: salt(),
  name: '',
};

const defaultRoom = {
  id: '',
  name: '',
  isPrivate: false,
  ownerId: '',
};

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState<User>(defaultUser);
  const [room, setRoom] = useState<Room>(defaultRoom);
  const [users, setUsers] = useState<Array<User>>([]);
  const [errors, setErrors] = useState<Array<string>>([]);

  useEffect(() => {
    socket.onopen = (event) => {
      console.log('onopen: ', event);
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      const { data } = event;
      const { code, payload } = JSON.parse(data);
      console.log(code, payload);

      if (code === 'ERR') {
        setErrors(errors.concat(payload.error));
      }

      if (code === 'COS') {
        setUser({ ...user, id: payload.userId });
      }

      if (code === 'RCS') {
        setRoom({ ...room, id: payload.roomId, ownerId: user.id });
        setUsers([user]);
      }

      if (code === 'JRO') {
        setRoom({
          ...room,
          name: payload.roomName,
          id: payload.roomId,
          isPrivate: payload.isPrivate,
        });
      }

      if (code === 'NEP') {
        setRoom({ ...room, ownerId: payload.ownerId });
        setUsers(payload.peers);
      }
    };

    socket.onerror = (event) => {
      console.log('onerror: ', event);
    };

    socket.onclose = (event) => {
      console.log('onclose: ', event);
      setIsConnected(false);
    };
  }, [user, room, errors]);

  const connect = (
    <Connect
      send={send(socket)}
      user={user}
      setUser={setUser}
      isConnected={isConnected}
    />
  );
  const home = (
    <Home
      user={user}
      users={users}
      room={room}
      setRoom={setRoom}
      send={send(socket)}
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
