import { useRouteLoaderData } from "react-router-dom";

import EventForm from "../components/EventForm";

function EditEventPage() {
  const data = useRouteLoaderData("event-detail");

  //return <EventForm method="patch" event={data.event} />;
  return (
    <>
      <p>Edit Event Page</p>
    </>
  );
}

export default EditEventPage;
