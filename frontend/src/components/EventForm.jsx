import { Form, json, redirect, useActionData, useNavigate, useNavigation } from 'react-router-dom';

import classes from './EventForm.module.css';
import { useState } from 'react';

const EventForm = ({ method, event }) => {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const data = useActionData();

  const isSubmitting = navigation.state === 'submitting';

  function cancelHandler() {
    navigate('..');
  }

  const [title, setTitle] = useState(event ? event.title : '');
  const [image, setImage] = useState(event ? event.image : '');
  const [date, setDate] = useState(event ? event.date : '');
  const [description, setDescription] = useState(event ? event.description : '');

  return (
    <Form method={method} className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" defaultValue={title} onChange={(e) => setTitle(e.target.value)} />
        {data && data.errors && <span style={{ color: 'red' }}>{data.errors.title}</span>}
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" defaultValue={image} onChange={(e) => setImage(e.target.value)} />
        {data && data.errors && <span style={{ color: 'red' }}>{data.errors.image}</span>}
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" defaultValue={date} onChange={(e) => setDate(e.target.value)} />
        {data && data.errors && <span style={{ color: 'red' }}>{data.errors.date}</span>}
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {data && data.errors && <span style={{ color: 'red' }}>{data.errors.description}</span>}
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting ? 'Submitting . . .' : 'Save'}</button>
      </div>
    </Form>
  );
};

export default EventForm;

export const action = async ({ request, params }) => {
  const method = request.method;
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  let url = 'http://localhost:8080/events/';

  if (method === 'PATCH') {
    url = `http://localhost:8080/events/` + params.eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect(method === 'PATCH' ? `/events/${params.eventId}` : '/events');
};
