import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import app from "../util/firebase";
import { eventsActions } from "./events-slice";
import { notificationActions } from "./notification-slice";

const db = getFirestore(app);
const usersRef = collection(db, "users");

export const fetchUsersData = () => {
  return (dispatch) => {
    const subscribeToRealtimeUpdates = (dispatch) => {
      const unsubscribe = onSnapshot(usersRef, (snapshot) => {
        const users = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        dispatch(eventsActions.fetchUsers(users));
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
          message: "Fetch users failed! Try again!",
        })
      );
    }
  };
};

export const addUser = (email, password) => {
  return async (dispatch) => {
    dispatch(
      notificationActions.showNotification({
        status: "pending...",
        title: "Sending...",
        message: "Sending account data!",
      })
    );
    const sendData = async () => {
      await addDoc(usersRef, {
        email,
        password,
      });
    };

    try {
      await sendData();
      dispatch(
        notificationActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Created account and logged in successfully!",
        })
      );
    } catch (error) {
      dispatch(
        notificationActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Create account failed!",
        })
      );
    }
  };
};
