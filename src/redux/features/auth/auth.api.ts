import { baseApi } from "@/redux/baseApi";
import { IResponse, ISendOtp, IVerifyOtp } from "@/types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userlogin: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/user/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    driverlogin: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/driver/login",
        method: "POST",
        data: userInfo,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
    }),
    userregister: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    driverregister: builder.mutation({
      query: (userInfo) => ({
        url: "/driver/register",
        method: "POST",
        data: userInfo,
      }),
    }),
    updateRideStatus: builder.mutation({
      query: ({ rideId, status }) => ({
        url: `/rides/status/${rideId}`, 
        method: "PATCH",
        body:  status , 
      }),
      invalidatesTags: ["RIDER"],
    }),
    sendOtp: builder.mutation<IResponse<null>, ISendOtp>({
      query: (userInfo) => ({
        url: "/otp/send",
        method: "POST",
        data: userInfo,
      }),
    }),
    verifyOtp: builder.mutation<IResponse<null>, IVerifyOtp>({
      query: (userInfo) => ({
        url: "/otp/verify",
        method: "POST",
        data: userInfo,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

export const {
  useUserregisterMutation,
  useDriverregisterMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
  useUserInfoQuery,
  useLogoutMutation,
  useUserloginMutation,
  useDriverloginMutation,
} = authApi;
