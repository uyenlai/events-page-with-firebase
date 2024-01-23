import { getFirestore, collection, getDocs } from "firebase/firestore";
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
