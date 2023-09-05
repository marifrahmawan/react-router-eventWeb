import React from 'react';
import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  let message = 'Something went Wrong.';

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    message = 'Could not Found';
  }

  return (
    <>
      <MainNavigation />
      <PageContent title="An Error Occured.">
        <>{message}</>
      </PageContent>
    </>
  );
};

export default ErrorPage;
