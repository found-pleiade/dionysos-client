/**
 * URL of the default WebSocket server.
 */
export const devServer = 'wss://dionysos-test.yannlacroix.fr';

/**
 * Length for the short id.
 */
export const idLength = 5;

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
    joinRoomAnswer: 'JRA',
  },
  response: {
    connection: 'COS',
    roomCreation: 'RCS',
    joinRoom: 'JRO',
    changeUserName: 'CHU',
    quitRoom: 'QRO',
    error: 'ERR',
    joinRequest: 'JRP',
    newPeers: 'NEP',
    denied: 'DEN',
  },
};
