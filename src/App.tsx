import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
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

  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark:text-dark-secondary h-screen cursor-default relative">
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
