/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetMyRidesQuery } from "@/redux/features/Rider/rider.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RequestRideModal } from "@/components/layout/RequestRideModal";
import { toast } from "react-toastify";
import { axiosInstance } from "@/lib/axios";


export default function MyRides() {
  const { data, isLoading: ridesLoading, isError, refetch } = useGetMyRidesQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  if (ridesLoading) return <p className="text-center py-10">Loading your rides...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to fetch rides.</p>;

  const rides = data?.data ? [data.data] : [];

  const handleCancel = async (rideId: string) => {
    try {
      setCancellingId(rideId);

      const response = await axiosInstance.patch(`/rides/status/${rideId}`, {
        status: "CANCELLED",
      });

      toast.success("Ride cancelled successfully!");
      console.log("Ride cancelled:", response.data);
      refetch(); 
    } catch (error: any) {
      console.error("Cancel failed:", error);
      toast.error(error?.response?.data?.message || "Failed to cancel ride");
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="p-6">
      <Button onClick={() => setIsModalOpen(true)} className="mb-6">
        Request New Ride
      </Button>

      {/* Request Ride Modal */}
      <RequestRideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} refetch={refetch} />

      {rides.length === 0 ? (
        <p className="text-center py-10">No rides found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride: any) => (
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

                {/* Show Cancel Button only if ride is still REQUESTED */}
                {ride.ridestatus === "REQUESTED" && (
                  <Button
                    onClick={() => handleCancel(ride._id)}
                    disabled={cancellingId === ride._id}
                    className="bg-red-500 text-white"
                  >
                    {cancellingId === ride._id ? "Cancelling..." : "Cancel Ride"}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
