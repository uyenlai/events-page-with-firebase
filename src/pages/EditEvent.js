import { useSelector } from "react-redux";
import EventForm from "../components/EventForm";
import { useParams } from "react-router-dom";

function EditEventPage() {
  const events = useSelector((state) => state.events.events);
  const params = useParams();

  const event = events.find((event) => event.id === params.id);
  return <EventForm method="PUT" event={event} />;
}

export default EditEventPage;
