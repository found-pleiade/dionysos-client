import React, { useState } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Connect from './pages/connect';
import Home from './pages/home';

const App = () => {
  const [username, setUsername] = useState('');

  return (
    <div className="text-neutral-50 bg-neutral-900 h-screen">
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Connect username={username} setUsername={setUsername} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
