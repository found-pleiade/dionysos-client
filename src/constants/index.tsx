import React from 'react';
import { v4 as salt } from 'uuid';

export const devServer = 'wss://dionysos-test.yannlacroix.fr';

export const defaultUser = {
  id: '',
  salt: salt(),
  name: '',
};

export const defaultRoom = {
  id: '',
  name: '',
  isPrivate: false,
  ownerId: '',
};

export const codes = {
  request: {
    connection: 'NCO',
    roomCreation: 'NRO',
    joinRoom: 'JRO',
    changeUserName: 'CHU',
  },
  response: {
    error: 'ERR',
    connection: 'COS',
    roomCreation: 'RCS',
    joinRoom: 'JRO',
    newPeers: 'NEP',
  },
};
