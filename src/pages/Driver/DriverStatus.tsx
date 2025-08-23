/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";
import { role } from "@/constants/role";

const DriverStatus = () => {
  const { data, isLoading, isError, refetch } = useUserInfoQuery(undefined);
  const user = data?.data;

  const [isOnline, setIsOnline] = useState(user?.isOnline || false);
  const [loading, setLoading] = useState(false);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to fetch driver info.</p>;
  if (!user) return <p className="text-center py-10">No driver data found.</p>;
  if (user.role !== role.driver) return <p className="text-center py-10">Only drivers can change status.</p>;

  const handleToggleStatus = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch("/driver/updateprofile", { isOnline: !isOnline });
      setIsOnline(!isOnline);
      refetch();
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md ">
      <Card className="shadow-lg rounded-2xl border border-border">
        <CardHeader>
          <CardTitle>Driver Active Status</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-start space-y-6">
          <div className="flex items-center gap-4">
            <label className="relative inline-flex items-center cursor-pointer select-none">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isOnline}
                onChange={handleToggleStatus}
                disabled={loading}
              />
              <div className="w-16 h-8 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-orange-500 rounded-full peer-checked:bg-amber-400 transition-all relative">
                <span
                  className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    isOnline ? "translate-x-8" : "translate-x-0"
                  }`}
                />
              </div>
              <span className="ml-4 text-sm font-medium text-foreground">
                {isOnline ? "Active" : "Inactive"}
              </span>
            </label>
          </div>

          <Button
            onClick={handleToggleStatus}
            disabled={loading}
            className="bg-orange-700 hover:bg-orange-500 text-foreground"
          >
            {loading ? "Updating..." : "Update Status"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverStatus;
