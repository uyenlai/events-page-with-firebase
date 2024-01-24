import {
  getFirestore,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import app from "../util/firebase";
import { eventsActions } from "./events-slice";
import { notificationActions } from "./notification-slice";

const db = getFirestore(app);
const eventsRef = collection(db, "events");

export const fetchEventsData = () => {
  return (dispatch) => {
    const subscribeToRealtimeUpdates = (dispatch) => {
      const unsubscribe = onSnapshot(eventsRef, (snapshot) => {
        const events = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(eventsActions.fetchEvents(events));
      });

      return unsubscribe;
    };

    try {
      const unsubscribe = subscribeToRealtimeUpdates(dispatch);
      return () => unsubscribe();
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching events failed!",
        })
      );
    }
  };
};

export const sendEvent = (event) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending...",
        title: "Sending...",
        message: "Sending event data!",
      })
    );
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
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Sent event data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending events failed!",
        })
      );
    }
  };
};

export const updateEvent = (id, event) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending...",
        title: "Updating...",
        message: "Updating event data!",
      })
    );

    const updateData = async () => {
      const eventDoc = doc(db, "events", id);
      await updateDoc(eventDoc, {
        date: event.date,
        description: event.description,
        image: event.image,
        title: event.title,
      });
    };

    try {
      await updateData();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Updated event data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Updating events failed!",
        })
      );
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending...",
        title: "Deleting...",
        message: "Deleting event data!",
      })
    );
    const deleteData = async () => {
      const eventDoc = doc(db, "events", id);
      await deleteDoc(eventDoc);
    };

    try {
      await deleteData();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Deleted event data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Delete events failed!",
        })
      );
    }
  };
};
