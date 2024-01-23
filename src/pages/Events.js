import EventsList from "../components/EventsList";
import { useSelector } from "react-redux";

export default function Events() {
  const events = useSelector((state) => state.events.events);
  return (
    <>
      {events.length === 0 && (
        <p style={{ textAlign: "center" }}>There's no event yet!</p>
      )}
      {events.length > 0 && <EventsList events={events} />}
    </>
  );
}
