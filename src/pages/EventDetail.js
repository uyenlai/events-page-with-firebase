import React from "react";
import { useParams } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { useSelector } from "react-redux";

const EventDetailPage = () => {
  const events = useSelector((state) => state.events.events);
  const params = useParams();
  const event = events.find((event) => event.id === params.id);

  return (
    <>
      <EventItem event={event} />
      <EventsList events={events} />
    </>
  );
};

export default EventDetailPage;
