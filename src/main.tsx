import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOMClient.createRoot(
  document.getElementById("root") as Element | DocumentFragment
);

const setVh = () => {
  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

setVh();
// We listen to the resize event
window.addEventListener("resize", () => {
  setVh();
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
