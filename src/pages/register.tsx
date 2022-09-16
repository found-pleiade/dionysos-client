import React, { Fragment, useContext, useEffect } from "react";
import CenterCard from "../components/CenterCard";
import RegisterForm from "../components/register/RegisterForm";
import ServerDialog from "../components/register/ServerDialog";
import { ShareContext } from "../features/shareRoom";
import useVersion from "../features/version";

const Register = () => {
  const share = useContext(ShareContext);
  const { isLoading, error, isCorrect, isCompatible } = useVersion();

  useEffect(() => {
    share.scanUrl();
  }, []);

  const pageState = () => {
    if (error ? true : false) {
      return (
        <CenterCard>
          Connection to the server failed.
          <br />
          Check your internet connection or try again later.
        </CenterCard>
      );
    }

    if (!isLoading && !isCompatible && isCorrect) {
      return (
        <CenterCard>
          Version mismatch between the client and the server.
        </CenterCard>
      );
    }

    if (!isLoading && !isCompatible && !isCorrect) {
      return <CenterCard>The server url seems wrong.</CenterCard>;
    }

    return (
      <Fragment>
        <ServerDialog className="ml-auto mr-4 md:mr-0 mb-3" />
        <RegisterForm disabled={isLoading} />
      </Fragment>
    );
  };

  return (
    <div className="h-dvh text-center flex flex-col">
      <header className="sm:mt-36">
        <h1
          className="text-[3.7rem] sm:text-[4.995rem] uppercase font-display font-semibold
        text-light-secondary-900 dark:text-dark-secondary-100 -mt-3 pt-2"
        >
          Dionysos
        </h1>

        <h2
          className="text-[1.125rem] sm:text-[1.51875rem] -mt-3 font-display font-medium
        text-light-secondary-800 dark:text-dark-secondary-200"
        >
          Share cinematic experiences.
        </h2>
      </header>

      <div className="flex-1 grid place-items-center lg:max-h-80">
        <div className="grid place-items-center w-screen sm:max-w-md">
          {pageState()}
        </div>
      </div>
    </div>
  );
};

export default Register;
