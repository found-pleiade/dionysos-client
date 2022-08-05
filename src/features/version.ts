const useVersion = (serverVersion = "x.x.x") => {
  const version = "0.1.0";

  const isCompatible = () => {
    const [major, minor] = version.split(".");
    const [serverMajor, serverMinor] = serverVersion.split(".");

    return (major === serverMajor) && (minor >= serverMinor);
  };

  const isCorrect = () => serverVersion.split(".").length === 3;

  return {
    isCompatible,
    isCorrect,
  };
};

export default useVersion;
