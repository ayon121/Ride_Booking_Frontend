import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAnalytics: builder.query({
      query: () => ({
        url: "/user/dashboard/admin",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response,
    }),
  }),
});

export const { useGetAdminAnalyticsQuery } = tourApi;
