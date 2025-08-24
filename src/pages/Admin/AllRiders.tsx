/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllRidersQuery } from "@/redux/features/Admin/admin.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UpdateRiderModal from "@/components/layout/UpdateRiderModal";

// Skeleton card for riders
const RiderSkeletonCard = () => (
    <Card className="shadow-md rounded-2xl animate-pulse">
        <CardHeader>
            <CardTitle className="flex justify-between items-center">
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-full"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="h-8 bg-gray-300 rounded w-full mt-2"></div>
        </CardContent>
    </Card>
);

const AllRiders = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const limit = 6; // items per page

    const { data, isLoading, isError, refetch } = useGetAllRidersQuery({
        searchTerm: search || "",
        page: page || 1,
        limit: limit || 6,
        from: from || undefined,
        to: to || undefined,
    });

    const [selectedRider, setSelectedRider] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleUpdate = (rider: any) => {
        setSelectedRider(rider);
        setIsModalOpen(true);
    };

    const riders = data?.data || [];
    const meta = data?.meta;

    if(isError) {
        return <h1>There is a Error. Try Again!</h1>
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Riders</h1>

            {/* Search & Filter Inputs */}
            <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Search by name or email"
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

            {/* Riders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                    ? Array.from({ length: limit }).map((_, idx) => <RiderSkeletonCard key={idx} />)
                    : riders.length === 0
                    ? <p className="col-span-full text-center py-10">No riders found.</p>
                    : riders.map((rider: any) => (
                        <Card key={rider._id} className="shadow-md rounded-2xl">
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    <span>{rider.name}</span>
                                    <span className="text-sm font-normal text-muted-foreground">
                                        {rider.isActive === "ACTIVE" ? "Active" : "Inactive"}
                                    </span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <p><strong>Email:</strong> {rider.email ?? "N/A"}</p>
                                <p><strong>Phone:</strong> {rider.phone ?? "N/A"}</p>
                                <p><strong>Address:</strong> {rider.address ?? "N/A"}</p>
                                <p><strong>Verified:</strong> {rider.isVerified ? "✅ Yes" : "❌ No"}</p>
                                <p><strong>Created:</strong> {new Date(rider.createdAt).toLocaleDateString()}</p>

                                <Button
                                    className="w-full mt-4"
                                    onClick={() => handleUpdate(rider)}
                                >
                                    Update
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                }

                {selectedRider && (
                    <UpdateRiderModal
                        rider={selectedRider}
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        refetch={refetch}
                    />
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

export default AllRiders;
