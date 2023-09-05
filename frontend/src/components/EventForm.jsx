import { Form, useNavigate } from 'react-router-dom';

import classes from './EventForm.module.css';
import { useState } from 'react';

const EventForm = ({ method, event }) => {
  const navigate = useNavigate();
  function cancelHandler() {
    navigate('..');
  }

  const [title, setTitle] = useState(event ? event.title : '');
  const [image, setImage] = useState(event ? event.image : '');
  const [date, setDate] = useState(event ? event.date : '');
  const [description, setDescription] = useState(event ? event.description : '');

  return (
    <Form method="post" className={classes.form}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler}>
          Cancel
        </button>
        <button>Save</button>
      </div>
    </Form>
  );
};

export default EventForm;
