/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { role } from "@/constants/role";
import { toast } from "sonner";

const Profile = () => {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (isLoading) return <p className="text-center py-10">Loading profile...</p>;
  if (isError)
    return <p className="text-center py-10 text-red-500">Failed to fetch profile.</p>;

  const user = data?.data;

  if (!user) return <p className="text-center py-10">No profile data found.</p>;

  const handleResetPassword = async () => {
    if (!oldPassword || !newPassword) {
      alert("Please fill both fields");
      return;
    }

    setLoading(true);

    const endpoint =
      user.role === role.driver
        ? "/auth/driver/reset-password"
        : "/auth/user/reset-password";

    try {
      await axiosInstance.patch(endpoint, { oldPassword, newPassword });
      toast.success("Password updated successfully");
      setOldPassword("");
      setNewPassword("");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.isActive}</p>
          <p><strong>Verified:</strong> {user.isVerified ? "Yes" : "No"}</p>
          <p><strong>Deleted:</strong> {user.isDelete ? "Yes" : "No"}</p>
          <p><strong>Ride History:</strong> {user.rideHistory?.length || 0} rides</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>

          <hr />
          <h1>Current Ride Info</h1>
          <p><strong>DropLocation :</strong> {user?.currentRide?.dropLocation || 'N/A'}</p>
          <p><strong>PaymentMethod :</strong> {user?.currentRide?.paymentMethod || 'N/A'}</p>
          <p><strong>PickupLocation :</strong> {user?.currentRide?.pickupLocation || 'N/A'}</p>
          <p><strong>Price :</strong> {user?.currentRide?.price || 'N/A'}</p>
          <p><strong>Paid :</strong> {user?.currentRide?.isPaid ? "Done" : 'Not Done'}</p>

          {/* ShadCN Dialog for Reset Password */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="mt-4">
                Reset Password
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Reset Password</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <DialogFooter className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setOldPassword("");
                    setNewPassword("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="bg-foreground text-orange-400 hover:bg-muted-foreground"
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
