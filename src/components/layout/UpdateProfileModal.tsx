/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import { toast } from "sonner";
import { role } from "@/constants/role";

interface Props {
  user: any;
  refetch: any;
}

const UpdateProfileModal = ({ user, refetch }: Props) => {
  const [name, setName] = useState(user.name);
  const [licenseNumber, setLicenseNumber] = useState(user.licenseNumber || "");
  const [vehicleType, setVehicleType] = useState(user.vehicleType || "");
  const [vehicleModel, setVehicleModel] = useState(user.vehicleModel || "");
  const [vehiclePlate, setVehiclePlate] = useState(user.vehiclePlate || "");
  const [driverlocation, setdriverlocation] = useState(user.driverlocation || "");
  const [loading, setLoading] = useState(false);

  const isDriver = user.role === role.driver;

  const handleUpdateProfile = async () => {
    if (!name) {
      toast.error("Name cannot be empty");
      return;
    }

    if (isDriver && (!licenseNumber || !vehicleType || !vehicleModel || !vehiclePlate || !driverlocation)) {
      toast.error("All driver fields must be filled");
      return;
    }

    setLoading(true);

    const endpoint = isDriver ? "/driver/updateprofile" : "/user/update";

    try {
      const updateData: any = { name };

      if (isDriver) {
        updateData.licenseNumber = licenseNumber;
        updateData.vehicleType = vehicleType;
        updateData.vehicleModel = vehicleModel;
        updateData.vehiclePlate = vehiclePlate;
        updateData.driverlocation = driverlocation;
      }

      await axiosInstance.patch(endpoint, updateData);

      toast.success("Profile updated successfully");
      refetch();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Update Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Name Field */}
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Driver-specific fields */}
          {isDriver && (
            <>
              <Input
                type="text"
                placeholder="License Number"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Vehicle Type"
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Vehicle Model"
                value={vehicleModel}
                onChange={(e) => setVehicleModel(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Vehicle Plate"
                value={vehiclePlate}
                onChange={(e) => setVehiclePlate(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Driver Location"
                value={driverlocation}
                onChange={(e) => setdriverlocation(e.target.value)}
              />
            </>
          )}

          {/* Email should never be editable */}
          <Input type="email" value={user.email} disabled className="opacity-70" />
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setName(user.name);
              setLicenseNumber(user.licenseNumber || "");
              setVehicleType(user.vehicleType || "");
              setVehicleModel(user.vehicleModel || "");
              setVehiclePlate(user.vehiclePlate || "");
              setdriverlocation(user.driverlocation || "");
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="bg-foreground text-orange-400 hover:bg-muted-foreground"
          >
            {loading ? "Updating..." : "Update"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
