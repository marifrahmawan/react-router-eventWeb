import React from 'react';
import EventList from '../components/EventsList';
import { useLoaderData, json } from 'react-router-dom';

const EventsPage = () => {
  const data = useLoaderData();
  
  return (
    <>
      <EventList events={data.events} />
    </>
  );
};

export default EventsPage;

export const loader = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (response.ok) {
    return response;
  } else {
    // return { isError: true, message: 'Failed to Fetch.' };

    // throw new Response(JSON.stringify({ message: 'Could Not Fetch Events.' }), { status: 500 });

    throw json(
      { message: 'Could Not Fetch Events.' },
      {
        status: 500,
      }
    );
  }
};
