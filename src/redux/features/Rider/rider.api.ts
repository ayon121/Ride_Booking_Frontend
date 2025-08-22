import { baseApi } from "@/redux/baseApi";

export const RiderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyRides: builder.query({
            query: () => ({
                url: "/rides/me",
                method: "GET",
            }),
            providesTags: ["RIDES"],
            transformResponse: (response) => response,
        }),
        getRideHistory: builder.query({
            query: () => ({
                url: "/rides/history",
                method: "GET",
            }),
            providesTags: ["RIDES"],
            transformResponse: (response) => response,
        }),
        requestRide: builder.mutation({
            query: (rideData) => {
                console.log("RTK Mutation payload going to backend:", rideData); // <-- Log here
                return {
                    url: "/rides/request",
                    method: "POST",
                    body: rideData, // make sure this is an object, NOT JSON.stringify
                };
            },
            invalidatesTags: ["RIDER"],
        }),
        updateRideStatus: builder.mutation({
            query: ({ rideId, status }) => ({
                url: `/rides/status/${rideId}`, // rideId in param
                method: "PATCH",
                body: { status }, // body with status
            }),
            invalidatesTags: ["RIDER"],
        }),
    }),
});

export const {
    useGetMyRidesQuery,
    useRequestRideMutation,
    useUpdateRideStatusMutation,
    useGetRideHistoryQuery,
} = RiderApi;
