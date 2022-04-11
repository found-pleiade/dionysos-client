import React, { Suspense, useEffect, useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as R from 'ramda';
import { appWindow } from '@tauri-apps/api/window';
import { codes, devServer } from './constants';
import useMessages from './hooks/messages';
import { isValid, notNil } from './utils';
import useConnection from './hooks/connection';
import useRoom from './hooks/room';
import useUsers from './hooks/users';
import Messages from './components/Messages';
import useJoinRequests from './hooks/joinRequests';

const Connect = React.lazy(() => import('./pages/connect'));
const Home = React.lazy(() => import('./pages/home'));

/**
 * App main function, here lies most states and every WebSocket listeners.
 * Returns the shell style, app router and messages.
 */
const App = () => {
  const connectPageReference = useRef<any>();
  const homePageReference = useRef<any>();

  const messages = useMessages();
  const connection = useConnection(devServer, messages, connectPageReference);
  const users = useUsers(connection, homePageReference);
  const room = useRoom();
  const joinRequests = useJoinRequests(connection, homePageReference);

  // Set the WebSocket to use on app start.
  // Listen for the app closing to close the WebSocket.
  useEffect(() => {
    try {
      const socket = new WebSocket(devServer);
      connection.setWebSocket(socket);

      appWindow.listen('tauri://close-requested', () => {
        if (notNil(connection.webSocket)) {
          const definedSocket = connection.webSocket as WebSocket;
          definedSocket.close(1000);
        }
        appWindow.close();
      });
    } catch (e: unknown) {
      const knowError = e as Error;
      messages.add(knowError.message, 'error');
    }
  }, []);

  // Every WebSocket listeners, only refreshed with key app state change.
  useEffect(() => {
    if (R.isNil(connection.webSocket)) return () => { };

    // Connection is up.
    connection.webSocket.onopen = (event) => {
      console.log('onopen: ', event);
      connection.setIsUp(true);
      connection.send(users.current.get.uuid);
    };

    // Server is sending data.
    connection.webSocket.onmessage = (event) => {
      const { data } = event;
      const { code, payload } = JSON.parse(data);
      console.log(code, payload);

      if (code === codes.response.error) {
        messages.add(payload.error, 'error');
      }

      if (code === codes.response.connection) {
        users.current.set({ ...users.current.get, id: payload.userId });
      }

      if (code === codes.response.roomCreation) {
        messages.clear();
        room.setCurrent({
          ...room.current,
          id: payload.roomId,
          ownerId: users.current.get.id,
        });
        users.set([users.current.get]);
      }

      if (code === codes.response.joinRoom) {
        if (!payload.isPrivate) {
          room.setCurrent({
            ...room.current,
            name: payload.roomName,
            id: payload.roomId,
            isPrivate: payload.isPrivate,
          });
        }

        if (payload.isPrivate) {
          messages.clear('Waiting for the host...', 'info', 9999999999999);

          room.setPending({
            ...room.current,
            name: payload.roomName,
            id: payload.roomId,
            isPrivate: payload.isPrivate,
          });
        }
      }

      if (code === codes.response.denied) {
        if (payload.requestCode === codes.request.joinRoom) {
          messages.clear('Connection to the room denied by the host.', 'error');
        }
      }

      if (code === codes.response.quitRoom) {
        messages.clear();
        room.resetCurrent();
        users.set([]);
      }

      if (code === codes.response.changeUserName && isValid(room.current.name)) {
        messages.clear();
        users.current.set({ ...users.current.get, name: payload.username });
      }

      if (code === codes.response.newPeers) {
        messages.clear();
        room.setCurrent({ ...room.current, ownerId: payload.ownerId });
        users.set(payload.peers);

        if (room.pending.isPrivate) {
          room.setCurrent({ ...room.pending, ownerId: payload.ownerId });
          room.resetPending();
        }
      }

      if (code === codes.response.joinRequest) {
        if (joinRequests.get.length === 0) {
          joinRequests.modal.toggle();
        }
        joinRequests.set(joinRequests.get.concat({
          requesterId: payload.requesterId,
          requesterUsername: payload.requesterUsername,
          roomId: payload.roomId,
        }));
      }
    };

    // Connection errors.
    connection.webSocket.onerror = (event) => {
      console.log('onerror: ', event);
    };

    // Connection is closed.
    connection.webSocket.onclose = (event) => {
      console.log('onclose: ', event);
      connection.setIsUp(false);

      if (users.current.get.id.length > 0) {
        messages.add('Connection lost', 'error');
      }
    };

    // Reset listeners on unmount.
    return () => {
      if (R.isNil(connection.webSocket)) return;

      connection.webSocket.onopen = null;
      connection.webSocket.onmessage = null;
      connection.webSocket.onerror = null;
      connection.webSocket.onclose = null;
    };
  }, [users, room, messages, connection]);

  return (
    <div className="dark:text-dark-secondary h-screen cursor-default relative">
      <Messages messages={messages} />

      <MemoryRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <Suspense fallback={<div />}>
                <Connect
                  connection={connection}
                  users={users}
                  reference={connectPageReference}
                />
              </Suspense>
            )}
          />
          <Route
            path="/home"
            element={(
              <Suspense fallback={<div />}>
                <Home
                  connection={connection}
                  users={users}
                  room={room}
                  joinRequests={joinRequests}
                  reference={homePageReference}
                />
              </Suspense>
            )}
          />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

export default App;
