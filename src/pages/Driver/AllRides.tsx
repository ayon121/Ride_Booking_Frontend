/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { axiosInstance } from "@/lib/axios";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { DriverApi, useGetallRequestedRideQuery } from "@/redux/features/Driver/driver.api";
import { useAppDispatch } from "@/redux/hook";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, AlertCircle, WifiOff } from "lucide-react"

import { useState } from "react";

const AllRides = () => {
  const { data, isLoading, isError, refetch } = useGetallRequestedRideQuery(undefined);
  const { data: userdata } = useUserInfoQuery(undefined);
  const dispatch = useAppDispatch();

  const [loadingRideId, setLoadingRideId] = useState<string | null>(null);

  const handleAcceptRide = async (rideId: string) => {
    try {
      setLoadingRideId(rideId);
      const response = await axiosInstance.patch(`/rides/status/${rideId}`, {
        status: "ACCEPTED",
      });

      console.log("Ride status updated:", response.data);

      refetch();
      dispatch(DriverApi.util.invalidateTags(["RIDES"]));
    } catch (error) {
      console.error("Error updating ride status:", error);
    } finally {
      setLoadingRideId(null);
    }
  };

  if (isLoading) {
    return (
      <Alert className="border-orange-500/40 text-orange-700 bg-orange-50 max-w-4xl">
        <Loader2 className="h-5 w-5 animate-spin text-orange-600" />
        <AlertTitle>Loading rides...</AlertTitle>
        <AlertDescription>
          Please wait while we fetch the latest ride requests for you.
        </AlertDescription>
      </Alert>
    )
  }

  if (isError) {
    return (
      <Alert variant="destructive" >
        <AlertCircle className="h-5 w-5 text-red-600" />
        <AlertTitle>Failed to load rides</AlertTitle>
        <AlertDescription>
          Something went wrong while fetching ride data. Please try again later.
        </AlertDescription>
      </Alert>
    )
  }

  if (!userdata?.data?.isOnline) {
    return (
      <Alert className="border-orange-500/40 text-orange-700 bg-muted max-w-4xl">
        <WifiOff className="h-5 w-5 text-orange-600" />
        <AlertTitle>Status Inactive</AlertTitle>
        <AlertDescription className="text-foreground">
          To see ride requests, please switch your status to <span className="font-semibold text-orange-700">Active</span>
        </AlertDescription>
      </Alert>
    )
  }


  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">All Request Rides</h1>
      {data?.data?.length === 0 ? (
        <p>No ride requests available.</p>
      ) : (
        <div className="grid gap-4">
          {data?.data?.map((ride: any) => (
            <div
              key={ride._id}
              className="p-4 border rounded-lg shadow-md flex justify-between items-center"
            >
              <div>
                <p>
                  <span className="font-semibold">Pickup:</span>{" "}
                  {ride.pickupLocation}
                </p>
                <p>
                  <span className="font-semibold">Drop:</span>{" "}
                  {ride.dropLocation}
                </p>
                <p>
                  <span className="font-semibold">Price:</span> {ride.price} Tk
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {ride.ridestatus}
                </p>
              </div>
              <button
                onClick={() => handleAcceptRide(ride._id)}
                disabled={loadingRideId === ride._id}
                className="px-4 py-2 bg-foreground text-orange-400 font-bold rounded-2xl disabled:opacity-50"
              >
                {loadingRideId === ride._id ? "Accepting..." : "Accept Ride"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllRides;
