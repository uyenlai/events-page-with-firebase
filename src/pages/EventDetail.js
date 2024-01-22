import React from "react";
import { useParams } from "react-router-dom";

const EventDetailPage = () => {
  const params = useParams();

  return (
    <>
      <p>Event Detail</p>
      {params.id}
    </>
  );
};

export default EventDetailPage;
