/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyRidesQuery } from "@/redux/features/Rider/rider.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";

enum RideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  PICKEDUP = "PICKEDUP",
  INTRANSIT = "INTRANSIT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

const validStatusFlow: Record<string, RideStatus> = {
  [RideStatus.REQUESTED]: RideStatus.ACCEPTED,
  [RideStatus.ACCEPTED]: RideStatus.PICKEDUP,
  [RideStatus.PICKEDUP]: RideStatus.INTRANSIT,
  [RideStatus.INTRANSIT]: RideStatus.COMPLETED,
};

export default function DriverRides() {
  const { data, isLoading: ridesLoading, isError, refetch } = useGetMyRidesQuery(undefined);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  if (ridesLoading) return <p className="text-center py-10">Loading your rides...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to fetch rides.</p>;

  // ✅ Only show rides that driver has already accepted or later in flow
  const rides = data?.data ? [data.data].filter((ride: any) =>
    [RideStatus.ACCEPTED, RideStatus.PICKEDUP, RideStatus.INTRANSIT].includes(ride.ridestatus)
  ) : [];

  const handleUpdateStatus = async (rideId: string, status: RideStatus) => {
    try {
      setLoadingId(rideId);

      const response = await axiosInstance.patch(`/rides/status/${rideId}`, { status });
      toast.success(`Ride updated to ${status}`);
      console.log("Ride status updated:", response.data);
      refetch();
    } catch (error: any) {
      console.error("Update failed:", error);
      toast.error(error?.response?.data?.message || "Failed to update ride");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="p-6">
      {rides.length === 0 ? (
        <p className="text-center py-10">No active rides found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride: any) => {
            const nextStatus = validStatusFlow[ride.ridestatus];

            return (
              <Card key={ride._id} className="shadow-md rounded-2xl w-auto">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Ride ID: {ride._id}</span>
                    <span className="text-sm font-normal text-muted-foreground">
                      {ride.ridestatus}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p><strong>Pickup:</strong> {ride.pickupLocation}</p>
                  <p><strong>Drop:</strong> {ride.dropLocation}</p>
                  <p><strong>Price:</strong> {ride.price}</p>
                  <p><strong>Payment:</strong> {ride.paymentMethod} ({ride.isPaid ? "Paid" : "Unpaid"})</p>
                  <p><strong>Requested At:</strong> {new Date(ride.requestedAt).toLocaleString()}</p>
                  <p><strong>Started At:</strong> {ride.startedAt ? new Date(ride.startedAt).toLocaleString() : "Not started"}</p>
                  <p><strong>Completed At:</strong> {ride.completedAt ? new Date(ride.completedAt).toLocaleString() : "Not completed"}</p>
                  <p><strong>Pickup OTP:</strong> {ride.pickupOtp}</p>

                  <div className="flex gap-2 mt-4">
                    {/* Show next status button */}
                    {nextStatus && (
                      <Button
                        onClick={() => handleUpdateStatus(ride._id, nextStatus)}
                        disabled={loadingId === ride._id}
                        className="bg-blue-500 text-white"
                      >
                        {loadingId === ride._id ? "Updating..." : `Mark as ${nextStatus}`}
                      </Button>
                    )}

                    {/*  Allow cancel until completed/cancelled */}
                    {ride.ridestatus !== RideStatus.COMPLETED &&
                      ride.ridestatus !== RideStatus.CANCELLED && (
                        <Button
                          onClick={() => handleUpdateStatus(ride._id, RideStatus.CANCELLED)}
                          disabled={loadingId === ride._id}
                          className="bg-red-500 text-white"
                        >
                          {loadingId === ride._id ? "Cancelling..." : "Cancel Ride"}
                        </Button>
                      )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
