import React, { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { dataType } from './constants';
import Connect from './pages/connect';
import Home from './pages/home';

const send = (socket: WebSocket) => (data: dataType) => socket.send(data);

const socket = new WebSocket('wss://dionysos.yannlacroix.fr');

const App = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    socket.onopen = (event) => {
      console.log('onopen: ', event);
    };

    socket.onmessage = (event) => {
      console.log('onmessage: ', event);
    };

    socket.onerror = (event) => {
      console.log('onerror: ', event);
    };

    socket.onclose = (event) => {
      console.log('onclose: ', event);
    };
  }, []);

  return (
    <div className="text-neutral-50 bg-neutral-900 h-screen">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Connect send={send(socket)} username={username} setUsername={setUsername} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
