import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import "@fontsource/source-sans-pro";
import "@fontsource/source-sans-pro/600.css";
import "@fontsource/montserrat";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/800.css";

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as Element | DocumentFragment
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
