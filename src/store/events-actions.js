import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";
import app from "../util/firebase";
import { eventsActions } from "./events-slice";

const db = getFirestore(app);
const eventsRef = collection(db, "events");

export const fetchEventsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const data = await getDocs(eventsRef);
      const events = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      return events;
    };

    try {
      const eventsData = await fetchData();
      dispatch(eventsActions.fetchData(eventsData));
    } catch (error) {
      //handleShowNotification
    }
  };
};

export const sendEvent = (event) => {
  return async (dispatch) => {
    const sendData = async () => {
      await addDoc(eventsRef, {
        date: event.date,
        description: event.description,
        image: event.image,
        title: event.title,
      });
    };

    try {
      await sendData();
      //Notification
    } catch (error) {
      //Notification
    }
  };
};
