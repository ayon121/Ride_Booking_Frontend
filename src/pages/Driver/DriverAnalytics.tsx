/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { useGetDriverAnalyticsQuery } from "@/redux/features/Driver/driver.api";

const DriverAnalytics = () => {
  const { data, isLoading, isError } = useGetDriverAnalyticsQuery(undefined);

  // Adjust if API returns { success, data }
  const analytics = data?.data || data;

  if (isLoading) return <p className="text-center py-10">Loading analytics...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to load analytics.</p>;
  if (!analytics) return <p className="text-center py-10">No analytics data available.</p>;

  const chartData = [
    { name: "Total Rides", value: analytics?.totalRides || 0 },
    { name: "Completed Rides", value: analytics?.completedRides || 0 },
    { name: "Earnings", value: analytics?.earnings || 0 },
    { name: "Rating", value: analytics?.rating || 0 },
  ];

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Driver Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Status Card */}
        <Card className="shadow-md rounded-2xl border border-border">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Online:</strong>{" "}
              <span className={analytics.isOnline ? "text-green-600" : "text-red-600"}>
                {analytics.isOnline ? "Yes" : "No"}
              </span>
            </p>
            <p>
              <strong>On Ride:</strong>{" "}
              <span className={analytics.currentRide ? "text-orange-500" : "text-gray-600"}>
                {analytics.currentRide ? "Yes" : "No"}
              </span>
            </p>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="shadow-md rounded-2xl border border-border">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <strong>Total Rides:</strong> {analytics.totalRides || 0}
            </p>
            <p>
              <strong>Completed Rides:</strong> {analytics.completedRides || 0}
            </p>
            <p>
              <strong>Earnings:</strong>  {analytics.earnings?.toFixed?.(2) || "0.00"} tk
            </p>
            <p>
              <strong>Rating:</strong> {analytics.rating?.toFixed?.(2) || "0.00"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart Card */}
      <Card className="shadow-md rounded-2xl border border-border">
        <CardHeader>
          <CardTitle>Analytics Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverAnalytics;
