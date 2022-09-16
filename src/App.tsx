import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Register from "./pages/register";
import Home from "./pages/home";
import useSettings, { SettingsContext } from "./states/settings";
import useUser, { UserContext } from "./states/user";
import useAuth, { AuthContext } from "./features/auth";
import useShareRoom, { ShareContext } from "./features/shareRoom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "@fontsource/source-sans-pro";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/fira-mono";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
      mutations: {},
    },
  });

  const settings = useSettings();
  const user = useUser();
  const auth = useAuth();
  const share = useShareRoom();

  return (
    <QueryClientProvider client={queryClient}>
      <ShareContext.Provider value={share}>
        <AuthContext.Provider value={auth}>
          <SettingsContext.Provider value={settings}>
            <UserContext.Provider value={user}>
              <div
                className="bg-light-primary-100 dark:bg-dark-primary-900
              text-light-secondary-900 dark:text-dark-secondary-100 h-full"
              >
                <MemoryRouter>
                  <Routes>
                    <Route path="/" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                  </Routes>
                </MemoryRouter>
              </div>
            </UserContext.Provider>
          </SettingsContext.Provider>
        </AuthContext.Provider>
      </ShareContext.Provider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
