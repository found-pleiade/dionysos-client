import React, { useContext, useEffect } from "react";
import RegisterForm from "../components/register/RegisterForm";
import ServerDialog from "../components/register/ServerDialog";
import { ShareContext } from "../features/shareRoom";
import useVersion from "../features/version";

const Register = () => {
  const share = useContext(ShareContext);
  const { isLoading, error, isCorrect, isCompatible } = useVersion();
  const isWrong = error ? true : false || !isCorrect || !isCompatible;

  useEffect(() => {
    share.scanUrl();
  }, []);

  return (
    <div className="h-full text-center flex flex-col">
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
          <ServerDialog className="ml-auto mr-4 md:mr-0 mb-3" />

          <RegisterForm
            disabled={isLoading || isWrong}
            loading={isLoading}
            error={isWrong}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
