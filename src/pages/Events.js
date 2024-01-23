import EventsList from "../components/EventsList";
import { useSelector } from "react-redux";

export default function Events() {
  const events = useSelector((state) => state.events.events);
  return (
    <>
      <EventsList events={events} />
    </>
  );
}
