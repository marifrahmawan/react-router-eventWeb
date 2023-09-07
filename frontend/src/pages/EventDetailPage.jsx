import React from 'react';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

const EventDetailPage = () => {
  const data = useRouteLoaderData('event-detail');

  return <EventItem event={data.event} />;
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const response = await fetch(`http://localhost:8080/events/${params.eventId}`);

  if (response.ok) {
    return response;
  } else {
    throw json(
      { message: 'Could not find events Data' },
      {
        status: 500,
      }
    );
  }
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
