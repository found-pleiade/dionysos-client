import { useContext } from "react";
import { useQuery } from "react-query";
import { SettingsContext } from "../states/settings";

const useVersion = (serverAddress?: string) => {
  const settings = useContext(SettingsContext);
  const version = "0.1.0";

  const { isStale, isLoading, isFetching, error, data, refetch } = useQuery(
    "getVersion",
    () =>
      fetch(`${serverAddress || settings.get.server}/version`).then((res) =>
        res.text()
      ),
    {
      staleTime: 800,
    }
  );

  const serverVersion = data ? data : "x.x.x";

  const isCompatible = () => {
    const [major, minor] = version.split(".");
    const [serverMajor, serverMinor] = serverVersion.split(".");

    return major === serverMajor && minor <= serverMinor;
  };

  const isCorrect = serverVersion.split(".").length === 3;

  return {
    isCompatible: isCompatible(),
    isCorrect,
    isLoading: isLoading || isFetching,
    isSuccess: !isStale && isCompatible() && isCorrect,
    error,
    refetch,
  };
};

export default useVersion;
