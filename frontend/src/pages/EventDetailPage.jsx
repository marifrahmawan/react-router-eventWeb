import React, { Suspense } from 'react';
import { Await, defer, json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';
import EventsList from '../components/EventsList';

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData('event-detail');

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading . . .</p>}>
        <Await resolve={event}>{(eventItem) => <EventItem event={eventItem} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading . . .</p>}>
        <Await resolve={events}>{(eventItems) => <EventsList events={eventItems} />}</Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvent = async (id) => {
  const response = await fetch(`http://localhost:8080/events/${id}`);

  if (response.ok) {
    const resData = await response.json();
    return resData.event;
  } else {
    throw json(
      { message: 'Could not find events Data' },
      {
        status: 500,
      }
    );
  }
};

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

export const loader = async ({ request, params }) => {
  return defer({
    event: await loadEvent(params.eventId),
    events: await loadEvents(),
  });
};

export const action = async ({ params, request }) => {
  const eventId = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: request.method,
  });

  if (!response.ok) {
    throw json(
      {
        message: 'Could not delete Event.',
      },
      {
        status: 500,
      }
    );
  }

  return redirect('/events');
};
