import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mylearningApi = createApi({
  reducerPath: "mylearning",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),

  endpoints: (builder) => ({
    getMylearning: builder.query({
      query: () => {
        return {
          url: "/mylearning",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetMylearningQuery } = mylearningApi;
export default mylearningApi;
