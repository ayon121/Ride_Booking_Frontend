/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";



interface UpdateRiderModalProps {
  rider: any;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; 
  refetch : any
}

const UpdateRiderModal = ({ rider, isOpen, onClose, onSuccess , refetch}: UpdateRiderModalProps) => {
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // ✅ Sync rider info when modal opens
  useEffect(() => {
    if (rider) {
      setFormData({ ...rider });
    }
  }, [rider]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value === "true" ? true : value === "false" ? false : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!rider?._id) return;

    try {
      setLoading(true);
      const res = await axiosInstance.patch(
        `/user/update-users/${rider._id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Rider updated successfully!");
      refetch()
      console.log("Rider update response:", res.data);

      if (onSuccess) onSuccess(); 
      onClose();
    } catch (err: any) {
      console.error("Failed to update rider:", err);
      toast.error(err?.response?.data?.message || "Failed to update rider");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg overflow-y-scroll max-h-[70vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Update Rider</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">Personal Info</h2>
            <Input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Name"
            />
            <Input
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              name="phone"
              value={formData.phone || ""}
              onChange={handleChange}
              placeholder="Phone"
            />
            <Input
              name="address"
              value={formData.address || ""}
              onChange={handleChange}
              placeholder="Address"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">Status</h2>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <label>Active</label>
              <select
                name="isActive"
                value={formData.isActive ? "true" : "false"}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>

            <div className="flex flex-col gap-2 text-muted-foreground">
              <label>Verified</label>
              <select
                name="isVerified"
                value={formData.isVerified ? "true" : "false"}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="true">Verified</option>
                <option value="false">Not Verified</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <label>Deleted</label>
              <select
                name="isDelete"
                value={formData.isDelete ? "true" : "false"}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="true">Deleted</option>
                <option value="false">Not Deleted</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <DialogFooter className="flex justify-end gap-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update"}
            </Button>
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRiderModal;
