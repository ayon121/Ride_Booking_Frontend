/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMyRidesQuery } from "@/redux/features/Rider/rider.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RequestRideModal } from "@/components/layout/RequestRideModal";
import { axiosInstance } from "@/lib/axios";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import EmergencyContactBtn from "@/components/layout/EmergencyContactBtn";

export default function MyRides() {
  const { data, isLoading: ridesLoading, isError, refetch } =
    useGetMyRidesQuery(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Live location modal
  const [locationUrl, setLocationUrl] = useState<string | null>(null);
  const [activeRideId, setActiveRideId] = useState<string | null>(null);
  const [sharingId, setSharingId] = useState<string | null>(null);

  const rides = data?.data ? [data.data] : [];

  const handleCancel = async (rideId: string) => {
    try {
      setCancellingId(rideId);

     await axiosInstance.patch(`/rides/status/${rideId}`, {
        status: "CANCELLED",
      });

      toast.success("Ride cancelled successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to cancel ride");
    } finally {
      setCancellingId(null);
    }
  };

  const handleShareLocation = (rideId: string) => {
    setSharingId(rideId);
    setActiveRideId(rideId);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          const shareUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          setLocationUrl(shareUrl);
          setSharingId(null);
        },
        (err ) => {
          console.log(err);
          toast.error("Unable to fetch location. Please enable GPS.");
          setSharingId(null);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast.error("Geolocation not supported in this browser.");
      setSharingId(null);
    }
  };

  return (
    <div className="p-6">
      <Button onClick={() => setIsModalOpen(true)} className="mb-6">
        Request New Ride
      </Button>

      {/* Request Ride Modal */}
      <RequestRideModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetch={refetch}
      />

      {/* Loading skeleton */}
      {ridesLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card
              key={i}
              className="shadow-md rounded-2xl w-auto p-4 space-y-3"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Array.from({ length: 8 }).map((_, j) => (
                  <Skeleton key={j} className="h-4 w-40" />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : isError ? (
        <p className="text-center py-10 text-red-500">Failed to fetch rides.</p>
      ) : rides.length === 0 ? (
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

                <div className="flex gap-2 mt-4">
                  {/* Cancel Ride */}
                  {ride.ridestatus === "REQUESTED" && (
                    <Button
                      onClick={() => handleCancel(ride._id)}
                      disabled={cancellingId === ride._id}
                      className="bg-red-500 text-white"
                    >
                      {cancellingId === ride._id
                        ? "Cancelling..."
                        : "Cancel Ride"}
                    </Button>
                  )}

                  {/* Share Live Location */}
                  <Button
                    onClick={() => handleShareLocation(ride._id)}
                    disabled={sharingId === ride._id}
                    className="bg-orange-500 text-white flex items-center gap-2"
                  >
                    {sharingId === ride._id ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Fetching...
                      </>
                    ) : (
                      "Share Live Location"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Live Location Modal */}
      <Dialog open={!!locationUrl} onOpenChange={() => setLocationUrl(null)}>
        <DialogContent className="rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-orange-600 text-lg">
               Share Your Live Location
            </DialogTitle>
          </DialogHeader>
          {locationUrl ? (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Ride Id: <span className="font-medium">{activeRideId}</span>
              </p>
              <div className="p-3 border rounded-xl bg-gray-50">
                <p className="break-all text-sm text-gray-700">{locationUrl}</p>
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(locationUrl);
                  toast.success("Copied to clipboard ");
                }}
                className="w-full bg-orange-500 hover:bg-amber-500"
              >
                Copy Link
              </Button>
            </div>
          ) : (
            <p className="text-center text-gray-500">Fetching location...</p>
          )}
        </DialogContent>
      </Dialog>
       <EmergencyContactBtn></EmergencyContactBtn>
    </div>
  );
}
