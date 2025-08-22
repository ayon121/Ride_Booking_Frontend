"use client";

import { useGetAdminAnalyticsQuery } from "@/redux/features/Admin/admin.api";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2, Users, Car, Wallet, Activity } from "lucide-react";

export default function Analytics() {
  const { data, isLoading, isError } = useGetAdminAnalyticsQuery(undefined);

  console.log(data);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load analytics data.
      </div>
    );
  }

  const stats = [
    { label: "Total Users", value: data?.totalUsers  || 0, icon: Users },
    { label: "Total Drivers", value: data?.totalDrivers || 0, icon: Car },
    { label: "Total Rides", value: data?.totalRides || 0, icon: Activity },
    { label: "Active Rides", value: data?.activeRides || 0, icon: Activity },
    { label: "Total Earnings", value: `$${data?.totalEarnings || 0}`, icon: Wallet },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <Card key={i} className="shadow-md hover:shadow-lg transition rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
            <stat.icon className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
