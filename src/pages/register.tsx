import React from 'react';
import { PropagateLoader } from 'react-spinners';
import CenterCard from '../components/register/CenterCard';
import RegisterForm from '../components/register/RegisterForm';
import ServerModal from '../components/register/ServerModal';
import useVersion from '../states/getVersion';

const Register = () => {
  const { isLoading, error, data } = useVersion();

  const pageSkeleton = (template: JSX.Element) => (
    <div className="page">
      {/* Main content of the page. */}
      <div className="absolute top-[43%] left-[50%] min-h-[500px] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col items-center">
        <header className="xl:mb-52 md:mb-32 mb-20">
          <h1 className="text-[6rem] -mb-6 font-black uppercase">Dyonisos</h1>
          <h2 className="text-[2rem] font-semibold">Share cinematic experiences.</h2>
        </header>

        {template}
      </div>

      <ServerModal />
    </div>
  );

  if (isLoading) {
    const color = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#000';

    return pageSkeleton(
      <CenterCard>
        <p className="font-medium text-xl text-center">Connection to the server</p>
        <PropagateLoader size=".65rem" color={color} cssOverride={{ paddingTop: '.65rem', paddingBottom: '.3rem' }} />
      </CenterCard>,
    );
  }

  if (error) {
    return pageSkeleton(
      <CenterCard>
        Connection to the server failed.
        <br />
        Check your internet connection or try again later.
      </CenterCard>,
    );
  }

  if (data !== '0.1.0') {
    return pageSkeleton(
      <CenterCard>
        Version mismatch between the client and the server api.
      </CenterCard>,
    );
  }

  return pageSkeleton(<RegisterForm />);
};

export default Register;
