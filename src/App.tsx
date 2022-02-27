import React, { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { dataType } from './constants';
import Connect from './pages/connect';
import Home from './pages/home';

const send = (socket: WebSocket) => (data: dataType) => socket.send(data);

const socket = new WebSocket('wss://dionysos.yannlacroix.fr');

const App = () => {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');

  useEffect(() => {
    socket.onopen = (event) => {
      console.log('onopen: ', event);
    };

    socket.onmessage = (event) => {
      const { data } = event;
      const { code, payload } = JSON.parse(data);

      if (code === 'COS') {
        setUserid(payload.userId);
      }
    };

    socket.onerror = (event) => {
      console.log('onerror: ', event);
    };

    socket.onclose = (event) => {
      console.log('onclose: ', event);
    };
  }, []);

  const connect = <Connect send={send(socket)} username={username} setUsername={setUsername} />;
  const home = <Home username={username} userid={userid} />;

  return (
    <div className="text-neutral-50 bg-neutral-900 h-screen">
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
