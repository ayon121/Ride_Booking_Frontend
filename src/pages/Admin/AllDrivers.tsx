/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllDriverQuery } from "@/redux/features/Admin/admin.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AllDrivers = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const limit = 6; // items per page

  const { data, isLoading, isError } = useGetAllDriverQuery({
    searchTerm: search,
    page,
    limit,
    ...(from && { from }),
    ...(to && { to }),
  });

  const handleUpdate = async (driver: any) => {
    console.log(driver);
  };

  if (isLoading) return <p className="text-center py-10">Loading drivers...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to fetch drivers.</p>;

  const drivers = data?.data || [];
  const meta = data?.meta;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">All Drivers</h1>

      {/* Filters Section */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name or email"
          className="border p-2 rounded-md flex-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <label className="text-sm">From:</label>
          <input
            type="date"
            className="border p-2 rounded-md"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>

        <div className="flex gap-2 items-center">
          <label className="text-sm">To:</label>
          <input
            type="date"
            className="border p-2 rounded-md"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>

        <Button onClick={() => setPage(1)}>Apply</Button>
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {drivers.length === 0 ? (
          <p className="col-span-full text-center py-10">No drivers found.</p>
        ) : (
          drivers?.map((driver: any) => (
            <Card key={driver._id} className="shadow-md rounded-2xl">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{driver.name}</span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {driver.isApproved ? "Approved" : "Pending"}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p><strong>Email:</strong> {driver.email ?? "N/A"}</p>
                <p><strong>License:</strong> {driver.licenseNumber ?? "N/A"}</p>
                <p><strong>Vehicle:</strong> {driver.vehicleType} - {driver.vehicleModel}</p>
                <p><strong>Plate:</strong> {driver.vehiclePlate}</p>
                <p><strong>Location:</strong> {driver.driverlocation}</p>
                <p><strong>Status:</strong> {driver.isActive ? "Active" : "Inactive"}</p>
                <p><strong>Rides:</strong> {driver.totalRides}</p>
                <p><strong>Rating:</strong> {"⭐".repeat(Math.round(driver.rating))} ({driver.rating})</p>

                <Button
                  className="w-full mt-4"
                  onClick={() => handleUpdate(driver)}
                >
                  Update
                </Button>
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

export default AllDrivers;
