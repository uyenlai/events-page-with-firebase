import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: { events: [] },
  reducers: {
    fetchData(state, action) {
      state.events = [...action.payload];
    },
  },
});

export const eventsActions = eventsSlice.actions;
export const eventsReducer = eventsSlice.reducer;
