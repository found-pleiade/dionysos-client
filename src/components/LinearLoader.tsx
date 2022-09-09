import React from "react";
import { PropagateLoader } from "react-spinners";

const LinearLoader = () => {
  const color = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "#fff"
    : "#000";

  return (
    <PropagateLoader
      size=".65rem"
      color={color}
      cssOverride={{ paddingTop: ".65rem", paddingBottom: ".3rem" }}
    />
  );
};

export default LinearLoader;
