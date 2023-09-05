import React from 'react';
import MainNavigation from './components/MainNavigation';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      {/* {navigation.state === 'loading' && <p>Loading . . .</p>} */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
