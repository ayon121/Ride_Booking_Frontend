import { baseApi } from "@/redux/baseApi";

export const DriverApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getallRequestedRide: builder.query({
            query: () => ({
                url: "/rides/request",
                method: "GET",
            }),
            providesTags: ["RIDES"],
            transformResponse: (response) => response,
        }),
       
        
    }),
});

export const {
   useGetallRequestedRideQuery
} = DriverApi;
