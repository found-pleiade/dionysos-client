import React, { Suspense, useEffect, useRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import * as R from 'ramda';
import { appWindow } from '@tauri-apps/api/window';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
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

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
