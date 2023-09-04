import React from 'react';
import EventList from '../components/EventsList';

const events = [
  {
    id: 'e1',
    title: 'A dummy event',
    date: '2023-02-22',
    image: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg',
    description: 'Join this amazing event and connect with fellow developers.',
  },
  {
    id: 'e2',
    title: 'A dummy event 2',
    date: '2023-02-22',
    image: 'https://blog.hubspot.de/hubfs/Germany/Blog_images/Optimize_Marketing%20Events%20DACH%202021.jpg',
    description: 'Join this amazing event and connect with fellow developers !!!!!!!!!!!!!!!!!!!',
  },
];

const EventsPage = () => {
  return <EventList events={events} />;
};

export default EventsPage;
