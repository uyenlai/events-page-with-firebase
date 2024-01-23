import { useDispatch } from "react-redux";
import classes from "./EventForm.module.css";
import { sendEvent } from "../store/events-actions";

function EventForm() {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    const array = [];
    for (const pair of data) {
      array.push(pair);
    }

    const eventData = Object.fromEntries(array);
    dispatch(sendEvent(eventData));
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required />
      </p>
      <div className={classes.actions}>
        <button type="button">Cancel</button>
        <button>Submit</button>
      </div>
    </form>
  );
}

export default EventForm;
