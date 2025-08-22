import { baseApi } from "@/redux/baseApi";

export const RiderApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyRides: builder.query({
            query: () => ({
                url: "/rides/me",
                method: "GET",
            }),
            providesTags: ["RIDER"],
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
    }),
});

export const {
    useGetMyRidesQuery,
    useRequestRideMutation,
} = RiderApi;
