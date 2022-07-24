import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Register from './pages/register';
import Home from './pages/home';
import useSettings, { SettingsContext } from './states/settings';
import useUser, { UserContext } from './states/user/user';

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

  const settings = useSettings();
  const user = useUser();

  return (
    <SettingsContext.Provider value={settings}>
      <UserContext.Provider value={user}>
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
      </UserContext.Provider>
    </SettingsContext.Provider>
  );
};

export default App;
