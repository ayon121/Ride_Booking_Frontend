/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { data, isLoading, isError } = useUserInfoQuery(undefined);

  if (isLoading) return <p className="text-center py-10">Loading profile...</p>;
  if (isError) return <p className="text-center py-10 text-red-500">Failed to fetch profile.</p>;

  const user = data?.data;

  if (!user) return <p className="text-center py-10">No profile data found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      <Card className="shadow-md rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Status:</strong> {user.isActive}</p>
          <p><strong>Verified:</strong> {user.isVerified ? "Yes" : " No"}</p>
          <p><strong>Deleted:</strong> {user.isDelete ? "Yes" : "No"}</p>
          {/* <p><strong>Current Ride:</strong> {user.currentRide || "No active ride"}</p> */}
          <p><strong>Ride History:</strong> {user.rideHistory?.length || 0} rides</p>
          <p><strong>Created At:</strong> {new Date(user.createdAt).toLocaleString()}</p>
          <p><strong>Updated At:</strong> {new Date(user.updatedAt).toLocaleString()}</p>
          <hr></hr>
          <h1>Current Ride Info</h1>
          <p><strong>DropLocation :</strong> {user?.currentRide?.dropLocation || 'N/A'}</p>
          <p><strong>PaymentMethod :</strong> {user?.currentRide?.paymentMethod || 'N/A'}</p>
          <p><strong>PickupLocation :</strong> {user?.currentRide?.pickupLocation || 'N/A'}</p>
          <p><strong>Price :</strong> {user?.currentRide?.price || 'N/A'}</p>
          <p><strong>Paid :</strong> {user?.currentRide?.isPaid ? "Done" : 'Not Done'}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
