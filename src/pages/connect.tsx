import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { PropagateLoader } from 'react-spinners';
import Button from '../components/Button';
import Input from '../components/Input';
import RowGroup from '../components/RowGroup';

const Connect = () => {
  const [username, setUsername] = useState('');

  /**
   * Get version to verify if the server is up.
   */
  const { isLoading, error, data } = useQuery(
    'repoData',
    () => fetch('https://dionysos-test.yannlacroix.fr/version').then(
      (res) => res.json(),
    ),
  );

  if (isLoading) {
    return (
      <div className="page flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-3">
          <p className="font-medium text-xl text-center">Connection to the server</p>
          <PropagateLoader size=".65rem" color="hsl(0, 0%, 2%)" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page flex justify-center items-center h-screen">
        <div className="flex flex-col items-center space-y-3">
          <p className="font-medium text-xl text-center">
            Connection to the server failed.
            <br />
            Check your internet connection or try again later.
          </p>
        </div>
      </div>
    );
  }

  console.log(data);

  return (
    <div className="page">
      {/* Main content of the page. */}
      <div className="absolute top-[30%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col items-center">
        <header className="xl:mb-52 md:mb-32 mb-20">
          <h1 className="text-[6rem] -mb-6 font-black uppercase">Dyonisos</h1>
          <h2 className="text-[2rem] font-semibold">Share cinematic experences.</h2>
        </header>

        <RowGroup>
          <Input id="connect" className="rounded-r-none bg-light-primary-100 focus:bg-light-primary-100" placeholder="Username" value={username} setValue={setUsername} />

          <Button className="rounded-l-none" />
        </RowGroup>
      </div>
    </div>
  );
};

export default Connect;
