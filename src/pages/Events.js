import { useEffect, useState } from "react";
import EventsList from "../components/EventsList";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../util/firebase";

export default function Events() {
  const [events, setEvents] = useState([]);
  const db = getFirestore(app);
  const eventsRef = collection(db, "events");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(eventsRef);
      setEvents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, [eventsRef]);

  return (
    <>
      <EventsList events={events} />
    </>
  );
}
