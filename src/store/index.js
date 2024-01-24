import { configureStore } from "@reduxjs/toolkit";
import { eventsReducer } from "./events-slice";
import { notificationReducer } from "./notification-slice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    notification: notificationReducer,
  },
});

export default store;
