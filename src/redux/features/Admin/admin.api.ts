import { baseApi } from "@/redux/baseApi";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminAnalytics: builder.query({
      query: () => ({
        url: "/user/dashboard/admin",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response.data,
    }),
    getAllRiders: builder.query({
      query: () => ({
        url: "/user/all-users",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response.data,
    }),
    getAllDriver: builder.query({
      query: () => ({
        url: "/driver/alldrivers",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response.data,
    }),
    getAllRides: builder.query({
      query: () => ({
        url: "/rides/all",
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response.data,
    }),

    //  Get Single Driver (Admin)
    getSingleDriver: builder.query({
      query: (driverId) => ({
        url: `/driver/${driverId}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response,
    }),

    //  Get Single Rider(Admin)
    getSingleRider : builder.query({
      query: (driverId) => ({
        url: `/user/${driverId}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response,
    }),

    //  Get Single Ride(Admin)
    getSingleRide : builder.query({
      query: (driverId) => ({
        url: `/rides/${driverId}`,
        method: "GET",
      }),
      providesTags: ["ADMIN"],
      transformResponse: (response) => response,
    }),

    //  Update Driver Profile
    updateDriver: builder.mutation({
      query: ({ driverId, ...updateData }) => ({
        url: `/driver/updatedriver/${driverId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["ADMIN"], 
      transformResponse: (response) => response,
    }),
    //  Update Rider Profile
    updateRider: builder.mutation({
      query: ({ userId, ...updateData }) => ({
        url: `/user/update-users/${userId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["ADMIN"], 
      transformResponse: (response) => response,
    }),
    //  Update Ride Profile
    updateRide: builder.mutation({
      query: ({ rideId, ...updateData }) => ({
        url: `/rides/updateride/${rideId}`,
        method: "PATCH",
        body: updateData,
      }),
      invalidatesTags: ["ADMIN"], 
      transformResponse: (response) => response,
    }),
  }),
});

export const { 
  useGetAdminAnalyticsQuery, 
  useGetAllRidersQuery, 
  useGetAllDriverQuery,
  useGetAllRidesQuery,
  useUpdateDriverMutation,
  useUpdateRiderMutation,
  useUpdateRideMutation,
  useGetSingleDriverQuery,
  useGetSingleRideQuery,
  useGetSingleRiderQuery,

} = adminApi;
