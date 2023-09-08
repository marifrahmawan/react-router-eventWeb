import React, { Suspense } from 'react';
import EventList from '../components/EventsList';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

const EventsPage = () => {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading . . .</p>}>
      <Await resolve={events}>{(loadedEvents) => <EventList events={loadedEvents} />}</Await>
    </Suspense>
  );
};

export default EventsPage;

const loadEvents = async () => {
  const response = await fetch('http://localhost:8080/events');

  if (response.ok) {
    const resData = await response.json();
    return resData.events;
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

export const loader = async () => {
  return defer({
    events: await loadEvents(),
  });
};
