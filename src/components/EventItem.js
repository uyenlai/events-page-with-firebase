import { Link, useNavigate } from "react-router-dom";
import classes from "./EventItem.module.css";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../store/events-actions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../util/firebase";
import { useState } from "react";

const auth = getAuth(app);

function EventItem({ event }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, (currentUser) => setUser(currentUser));

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
          {user && (
            <menu className={classes.actions}>
              <Link to="edit">Edit</Link>
              <button onClick={() => handleDelete(event.id)}>Delete</button>
            </menu>
          )}
        </article>
      )}
      {!event && <p>Fetching event...</p>}
    </>
  );
}

export default EventItem;
