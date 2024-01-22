import React from "react";
import { Link, useParams } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  const params = useParams();

  return (
    <>
      <p>Event Detail</p>
      <Link to="/events">Back to all Events</Link>
    </>
  );
};

export default EventDetailPage;
