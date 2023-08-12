import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: initialState,
  reducers: {
    replaceUser: (state, actions) => {
      state.user = actions.payload.user;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
export default currentUserSlice.reducer;
