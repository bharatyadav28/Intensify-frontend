import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import coursesSlice from "./courses";
import currentUserSlice from "./current-user";
import orderSlice from "./order";

import cartApi from "./apis/cart-api";
import mylearningApi from "./apis/mylearning-api";
import courseVideosApi from "./apis/course-videos";
import reviewApi from "./apis/review-api";

// One and only store for the application
const store = configureStore({
  reducer: {
    courses: coursesSlice,
    currentUser: currentUserSlice,
    order: orderSlice,

    // api reducers
    [cartApi.reducerPath]: cartApi.reducer,
    [mylearningApi.reducerPath]: mylearningApi.reducer,
    [courseVideosApi.reducerPath]: courseVideosApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(cartApi.middleware)
      .concat(mylearningApi.middleware)
      .concat(courseVideosApi.middleware)
      .concat(reviewApi.middleware),
});

//  required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;
