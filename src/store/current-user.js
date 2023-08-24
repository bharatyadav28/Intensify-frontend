import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoading: false,
  errors: null,
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
    fetchErrors: (state, actions) => {
      state.errors = actions.payload;
    },
    loading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const currentUserActions = currentUserSlice.actions;
export default currentUserSlice.reducer;
