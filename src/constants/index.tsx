import { v4 as uuidv4 } from 'uuid';

/**
 * URL of the default WebSocket server.
 */
export const devServer = 'wss://dionysos-test.yannlacroix.fr';

/**
 * Length for the short id.
 */
export const idLength = 5;

/**
 * Default object for app initialization.
 */
export const defaultUser = {
  id: '',
  uuid: uuidv4(),
  name: '',
};

/**
 * Default object for app initialization.
 */
export const defaultRoom = {
  id: '',
  name: '',
  isPrivate: false,
  ownerId: '',
};

/**
 * Codes sent to the server and received from the server.
 */
export const codes = {
  request: {
    connection: 'NCO',
    roomCreation: 'NRO',
    joinRoom: 'JRO',
    changeUserName: 'CHU',
    quitRoom: 'QRO',
  },
  response: {
    success: 'SUC',
    error: 'ERR',
    connection: 'COS',
    roomCreation: 'RCS',
    joinRoom: 'JRO',
    changeUserName: 'CHU',
    quitRoom: 'QRO',
    newPeers: 'NEP',
  },
};
