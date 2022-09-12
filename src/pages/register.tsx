import React, { Fragment, useContext, useEffect } from "react";
import LinearLoader from "../components/LinearLoader";
import CenterCard from "../components/CenterCard";
import RegisterForm from "../components/register/RegisterForm";
import ServerModal from "../components/register/ServerModal";
import { ShareContext } from "../features/shareRoom";
import useVersion from "../features/version";

const Register = () => {
  const share = useContext(ShareContext);
  const { isLoading, error, isCorrect, isCompatible } = useVersion();

  useEffect(() => {
    share.scanUrl();
  }, []);

  const pageState = () => {
    if (isLoading) {
      return (
        <CenterCard>
          <p className="font-medium text-xl text-center">
            Connection to the server
          </p>

          <LinearLoader />
        </CenterCard>
      );
    }

    if (error ? true : false) {
      return (
        <CenterCard>
          Connection to the server failed.
          <br />
          Check your internet connection or try again later.
        </CenterCard>
      );
    }

    if (!isCompatible && isCorrect) {
      return (
        <CenterCard>
          Version mismatch between the client and the server.
        </CenterCard>
      );
    }

    if (!isCompatible && !isCorrect) {
      return <CenterCard>The server url seems wrong.</CenterCard>;
    }

    return (
      <Fragment>
        <ServerModal />
        <RegisterForm />
      </Fragment>
    );
  };

  return (
    <div className="h-screen text-center">
      <header className="mb-14 mt-4 mx-4">
        <h1
          className="text-[3.4375rem] uppercase font-display font-semibold
        text-light-secondary-900 -mt-3"
        >
          Dionysos
        </h1>

        <h2
          className="text-[1.125rem] -mt-3 font-display font-medium
        text-light-secondary-800"
        >
          Share cinematic experiences.
        </h2>
      </header>

      {pageState()}
    </div>
  );
};

export default Register;
