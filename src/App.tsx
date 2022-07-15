import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Register from './pages/register';
import Home from './pages/home';
import SettingsContext from './contexts/SettingContext';
import useSettings from './hooks/settings';

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

  return (
    <SettingsContext.Provider value={settings}>
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
    </SettingsContext.Provider>
  );
};

export default App;
