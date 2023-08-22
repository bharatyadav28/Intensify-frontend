import { createSlice } from "@reduxjs/toolkit";

const initialCourses = { courses: [], errors: null, isLoading: false };
const coursesSlice = createSlice({
  name: "courses",
  initialState: initialCourses,
  reducers: {
    replaceCourses: (state, actions) => {
      // console.log("In the redux");
      state.courses = actions.payload.courses;

      state.errors = null;
      state.isLoading = false;
    },
    addCourse: (state, actions) => {
      state.courses.push(actions.payload.course);
    },

    fetchErrors: (state, actions) => {
      state.errors = actions.payload;
      state.isLoading = false;
    },

    loading: (state) => {
      state.isLoading = true;
    },
  },
});

export const coursesActions = coursesSlice.actions;
export default coursesSlice.reducer;
