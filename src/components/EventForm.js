import { useDispatch } from "react-redux";
import classes from "./EventForm.module.css";
import { sendEvent, updateEvent } from "../store/events-actions";
import { useNavigate, useParams } from "react-router-dom";

function EventForm({ method, event }) {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const array = [];
    for (const pair of data) {
      array.push(pair);
    }

    const eventData = Object.fromEntries(array);

    if (method === "POST") {
      dispatch(sendEvent(eventData));
      navigate("/events");
    }

    if (method === "PUT") {
      dispatch(updateEvent(params.id, eventData));
      navigate(`/events/${params.id}`);
    }
  }

  function handleCancel() {
    navigate("/events");
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit} method={method}>
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default EventForm;
