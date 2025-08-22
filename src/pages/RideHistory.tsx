/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetRideHistoryQuery } from "@/redux/features/Rider/rider.api";
import { Loader2 } from "lucide-react";

const RideHistory = () => {
  const { data, isLoading, isError } = useGetRideHistoryQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
        <p className="ml-2 text-gray-500">Loading ride history...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 py-6">
        Failed to load ride history.
      </div>
    );
  }

  const rides = data?.data || [];

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ride History</h2>

      {rides.length === 0 ? (
        <p className="text-muted-foreground text-center">No rides found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {rides.map((ride: any) => (
            <div
              key={ride._id}
              className=" border rounded-2xl shadow-sm p-4 flex flex-col space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Status:{"    "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      ride.ridestatus === "ACCEPTED"
                        ? "bg-green-100 text-green-600"
                        : ride.ridestatus === "CANCELLED"
                        ? "bg-red-100 text-red-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {ride.ridestatus}
                  </span>
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(ride.requestedAt).toLocaleDateString()}{" "}
                  {new Date(ride.requestedAt).toLocaleTimeString()}
                </span>
              </div>

              <div>
                <p className="text-sm">
                  <span className="font-semibold">From:</span>{" "}
                  {ride.pickupLocation}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">To:</span>{" "}
                  {ride.dropLocation}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm">
                  <span className="font-semibold">Driver:</span>{" "}
                  {ride.driverId?.name || "N/A"}
                </p>
                <p className="text-sm font-bold text-green-700">
                  ৳ {ride.price}
                </p>
              </div>

              <div className="text-xs text-muted-foreground">
                Payment: {ride.paymentMethod} | Paid:{" "}
                {ride.isPaid ? "Yes" : "No"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RideHistory;
