/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllRidesQuery } from "@/redux/features/Admin/admin.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Skeleton for ride card
const RideSkeletonCard = () => (
    <Card className="shadow-md rounded-2xl animate-pulse">
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
        </CardContent>
    </Card>
);

const AllRides = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const limit = 6;

    const { data, isLoading, isError } = useGetAllRidesQuery({
        searchTerm: search || "",
        page: page || 1,
        limit: limit || 6,
        from: from || undefined,
        to: to || undefined,
    });

    const rides = data?.data || [];
    const meta = data?.meta;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Rides</h1>

            {/* Search & Filter Inputs */}
            <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by pickup, drop or payment method"
                    className="border p-2 rounded-md flex-1"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <input
                    type="date"
                    className="border p-2 rounded-md"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <input
                    type="date"
                    className="border p-2 rounded-md"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                />
                <Button onClick={() => setPage(1)}>Apply</Button>
            </div>

            {/* Rides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    Array.from({ length: limit }).map((_, idx) => <RideSkeletonCard key={idx} />)
                ) : isError ? (
                    <p className="col-span-full text-center py-10 text-red-500">
                        Failed to fetch rides.
                    </p>
                ) : rides.length === 0 ? (
                    <p className="col-span-full text-center py-10">No rides found.</p>
                ) : (
                    rides.map((ride: any) => (
                        <Card key={ride._id} className="shadow-md rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>{ride.pickupLocation} → {ride.dropLocation}</span>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {ride.status ?? "Pending"}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p><strong>Payment:</strong> {ride.paymentMethod ?? "N/A"}</p>
                                <p><strong>Rider:</strong> {ride?.riderId?.name} ({ride?.riderId?.email})</p>
                                <p><strong>Driver:</strong> {ride?.driverId?.name} ({ride?.driverId?.email})</p>
                                <p><strong>Created:</strong> {new Date(ride.createdAt).toLocaleDateString()}</p>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>

            {/* Pagination */}
            {meta && meta.totalPage > 1 && (
                <div className="mt-6 flex justify-center items-center gap-2">
                    <Button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</Button>
                    <span>
                        Page {page} of {meta.totalPage}
                    </span>
                    <Button disabled={page === meta.totalPage} onClick={() => setPage(page + 1)}>Next</Button>
                </div>
            )}
        </div>
    );
};

export default AllRides;
