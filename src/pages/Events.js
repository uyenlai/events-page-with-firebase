import { useEffect } from "react";
import EventsList from "../components/EventsList";
import { useDispatch, useSelector } from "react-redux";
import { fetchEventsData } from "../store/events-actions";

export default function Events() {
  const events = useSelector(state => state.events.events)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEventsData());
  }, [dispatch]);

  return (
    <>
      <EventsList events={events} />
    </>
  );
}
