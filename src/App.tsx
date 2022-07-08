import React, { Suspense } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Messages from './components/Messages';
import useMessages from './hooks/messages';

const Connect = React.lazy(() => import('./pages/connect'));
const Home = React.lazy(() => import('./pages/home'));

/**
 * App main function, here lies most states and every WebSocket listeners.
 * Returns the shell style, app router and messages.
 */
const App = () => {
  const queryClient = new QueryClient();

  const messages = useMessages();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark:text-dark-secondary h-screen cursor-default relative">
        <Messages messages={messages} />

        <MemoryRouter>
          <Routes>
            <Route
              path="/"
              element={(
                <Suspense fallback={<div className="page" />}>
                  <Connect />
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
