import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApi = createApi({
  reducerPath: "review",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),

  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => {
        return {
          url: "/reviews/top",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetReviewsQuery } = reviewApi;
export default reviewApi;
