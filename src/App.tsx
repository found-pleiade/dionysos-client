import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Messages from './components/Messages';
import useMessages from './hooks/messages';
import Register from './pages/register';
import Home from './pages/home';

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {
      },
    },
  });

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
                <Register />
              )}
            />
            <Route
              path="/home"
              element={(
                <Home />
              )}
            />
          </Routes>
        </MemoryRouter>
      </div>
    </QueryClientProvider>
  );
};

export default App;
