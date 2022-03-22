import { v4 as uuidv4 } from 'uuid';

export const devServer = 'wss://dionysos-test.yannlacroix.fr';

export const defaultUser = {
  id: '',
  uuid: uuidv4(),
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
    changeUserName: 'CHU',
    newPeers: 'NEP',
  },
};
