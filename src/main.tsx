import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOMClient.createRoot(
  document.getElementById('root') as Element | DocumentFragment,
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
