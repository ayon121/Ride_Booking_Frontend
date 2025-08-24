/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetRideHistoryQuery } from "@/redux/features/Rider/rider.api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Skeleton for ride cards
const RideCardSkeleton = () => (
  <div className="border rounded-2xl shadow-sm p-4 flex flex-col space-y-2 animate-pulse">
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4"></div>
  </div>
);

const ITEMS_PER_PAGE = 5;

const RideHistory = () => {
  const { data, isLoading, isError } = useGetRideHistoryQuery(undefined);
  const rides = data?.data || [];

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [fareMin, setFareMin] = useState("");
  const [fareMax, setFareMax] = useState("");
  const [page, setPage] = useState(1);

  const filteredRides = rides.filter((ride: any) => {
    const searchMatch =
      ride.pickupLocation?.toLowerCase().includes(search.toLowerCase()) ||
      ride.dropLocation?.toLowerCase().includes(search.toLowerCase()) ||
      ride.driverId?.name?.toLowerCase().includes(search.toLowerCase());

    const statusMatch = status === "ALL" || ride.ridestatus === status;

    const date = new Date(ride.requestedAt);
    const fromOk = !dateFrom || date >= new Date(dateFrom);
    const toOk = !dateTo || date <= new Date(dateTo);

    const fareOk =
      (!fareMin || ride.price >= Number(fareMin)) &&
      (!fareMax || ride.price <= Number(fareMax));

    return searchMatch && statusMatch && fromOk && toOk && fareOk;
  });

  const totalPages = Math.ceil(filteredRides.length / ITEMS_PER_PAGE);
  const paginatedRides = filteredRides.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Ride History</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
            <RideCardSkeleton key={idx} />
          ))}
        </div>
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ride History</h2>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex flex-row gap-2.5">
          <Input
            placeholder="Search by location/driver"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex gap-2">
            <Button
              variant={status === "ALL" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatus("ALL")}
            >
              All
            </Button>
            <Button
              variant={status === "ACCEPTED" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatus("ACCEPTED")}
            >
              Accepted
            </Button>
            <Button
              variant={status === "CANCELLED" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatus("CANCELLED")}
            >
              Cancelled
            </Button>
            <Button
              variant={status === "PENDING" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatus("PENDING")}
            >
              Pending
            </Button>
            <Button
              variant={status === "COMPLETED" ? "default" : "outline"}
              size="sm"
              onClick={() => setStatus("COMPLETED")}
            >
              Completed
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-2.5">
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Min Fare"
            value={fareMin}
            onChange={(e) => setFareMin(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Max Fare"
            value={fareMax}
            onChange={(e) => setFareMax(e.target.value)}
          />
        </div>
      </div>

      {paginatedRides.length === 0 ? (
        <p className="text-muted-foreground text-center">No rides found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {paginatedRides.map((ride: any) => (
            <div
              key={ride._id}
              className="border rounded-2xl shadow-sm p-4 flex flex-col space-y-2"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${ride.ridestatus === "ACCEPTED"
                      ? "bg-green-100 text-green-600"
                      : ride.ridestatus === "CANCELLED"
                        ? "bg-red-100 text-red-600"
                        : ride.ridestatus === "COMPLETED"
                          ? "bg-blue-100 text-blue-600"
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
                <p className="text-sm font-bold text-green-700">৳ {ride.price}</p>
              </div>

              <div className="text-xs text-muted-foreground">
                Payment: {ride.paymentMethod} | Paid: {ride.isPaid ? "Yes" : "No"}
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <span className="text-sm flex items-center">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default RideHistory;
