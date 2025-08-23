/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { role } from "@/constants/role";

interface Props {
  user: any;
  refetch: any;

}

const UpdateProfileModal = ({ user , refetch}: Props) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async () => {
    if (!name || !email) {
      alert("Name and Email cannot be empty");
      return;
    }

    setLoading(true);

    const endpoint = user.role === role.driver ? "/driver/updateprofile" : "/user/update";

    try {
      await axiosInstance.patch(endpoint, { name, email });
      toast.success("Profile updated successfully");
      refetch()
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
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setName(user.name);
              setEmail(user.email);
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
