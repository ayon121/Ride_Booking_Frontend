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
            query: (params) => ({
                url: "/user/all-users",
                method: "GET",
                params: params,
            }),
            providesTags: ["ADMIN"],
            transformResponse: (response) => response,
        }),
        getAllDriver: builder.query({
            query: (params) => ({
                url: "/driver/alldrivers",
                method: "GET",
                params: params,
            }),
            providesTags: ["DRIVER"],
            transformResponse: (response) => response,
        }),
        getAllRides: builder.query({
            query: (params) => ({
                url: "/rides/all",
                method: "GET",
                params: params,
            }),
            providesTags: ["ADMIN"],
            transformResponse: (response) => response,
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
        getSingleRider: builder.query({
            query: (driverId) => ({
                url: `/user/${driverId}`,
                method: "GET",
            }),
            providesTags: ["ADMIN"],
            transformResponse: (response) => response,
        }),

        //  Get Single Ride(Admin)
        getSingleRide: builder.query({
            query: (driverId) => ({
                url: `/rides/${driverId}`,
                method: "GET",
            }),
            providesTags: ["ADMIN"],
            transformResponse: (response) => response,
        }),

        //  Update Driver Profile
        updateDriver: builder.mutation({
            query: ( {data }) => {
                console.log("RTK Payload going to backend:", data._id); // 👀
                return {
                    url: `/driver/updatedriver/${data?._id}`,
                    method: "PATCH",
                    body: data,
                    headers: { "Content-Type": "application/json" },
                };
            },
            invalidatesTags: ["DRIVER"],
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
