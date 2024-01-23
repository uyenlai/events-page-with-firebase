import { Link, useNavigate } from "react-router-dom";

import classes from "./EventItem.module.css";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../store/events-actions";

function EventItem({ event }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleDelete(id) {
    dispatch(deleteEvent(id));
    navigate("/events");
  }

  return (
    <>
      {event && (
        <article className={classes.event}>
          <img src={event.image} alt={event.title} />
          <h1>{event.title}</h1>
          <time>{event.date}</time>
          <p>{event.description}</p>
          <menu className={classes.actions}>
            <Link to="edit">Edit</Link>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </menu>
        </article>
      )}
      {!event && <p>Fetching event...</p>}
    </>
  );
}

export default EventItem;
