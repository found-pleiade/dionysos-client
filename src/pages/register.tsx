import React, { useContext, useEffect } from "react";
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

    return <RegisterForm />;
  };

  return (
    <div className="page">
      {/* Main content of the page. */}
      <div className="h-screen text-center pt-8">
        <header className="mb-36">
          <h1 className="text-[3.5rem] font-black uppercase">Dyonisos</h1>
          <h2 className="text-[1.3rem] -mt-3 font-semibold">
            Share cinematic experiences.
          </h2>
        </header>

        {pageState()}
      </div>

      <ServerModal />
    </div>
  );
};

export default Register;
