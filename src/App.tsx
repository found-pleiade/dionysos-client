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
              <div className="dark:text-dark-secondary h-screen cursor-default relative">
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
