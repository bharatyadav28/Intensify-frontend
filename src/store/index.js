import { configureStore } from "@reduxjs/toolkit";
import coursesSlice from "./courses";
import currentUserSlice from "./current-user";

// One and only store for the application
const store = configureStore({
  reducer: {
    courses: coursesSlice,
    currentUser: currentUserSlice,
  },
});

export default store;
