import { useState } from "react";

const useVersion = (serverVersion = "x.x.x") => {
  const [version] = useState("0.1.0");

  const isCompatible = () => {
    const [major, minor] = version.split(".");
    const [majorServer, minorServer] = serverVersion.split(".");

    if (major !== majorServer) return false;
    if (minor >= minorServer) return true;

    return true;
  };

  const isCorrect = () => serverVersion.split(".").length === 3;

  return {
    isCompatible,
    isCorrect,
  };
};

export default useVersion;
