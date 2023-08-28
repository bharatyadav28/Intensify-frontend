import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const courseVideosApi = createApi({
  reducerPath: "courseVideos",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1" }),
  endpoints: (builder) => ({
    getCourseVideos: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/videos/${id}`,
        };
      },
    }),
  }),
});

export const { useGetCourseVideosQuery } = courseVideosApi;
export default courseVideosApi;
