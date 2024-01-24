import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: { events: [], users: [] },
  reducers: {
    fetchEvents(state, action) {
      state.events = [...action.payload];
    },
    fetchUsers(state, action) {
      state.users = [...action.payload];
    },
  },
});

export const eventsActions = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
