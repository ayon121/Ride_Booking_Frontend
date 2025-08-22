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
import { useUpdateDriverMutation } from "@/redux/features/Admin/admin.api";

interface UpdateDriverModalProps {
    driver: any;
    isOpen: boolean;
    onClose: () => void;
}

const UpdateDriverModal = ({ driver, isOpen, onClose }: UpdateDriverModalProps) => {
    const [formData, setFormData] = useState<any>({ ...driver });
    const [updateDriver, {isLoading} ] = useUpdateDriverMutation();

    // Keep formData in sync when modal opens with a new driver
    useEffect(() => {
        setFormData({ ...driver });
    }, [driver]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({
            ...prev,
            // convert boolean fields
            [name]: value === "true" ? true : value === "false" ? false : value
        }));
    };


    //  const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault()

    //     console.log("Submitting data:", formData); 


    //     try {
    //         const res = await axiosInstance.patch(
    //             `/driver/updatedriver/${driver._id}`,
    //             formData,
    //             {
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //             }
    //         );

    //         console.log("Update response:", res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting data:", formData); // <- Check this first
        updateDriver({data : formData});
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-lg overflow-y-scroll max-h-[70vh]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Update Driver</DialogTitle>
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
                            name="driverlocation"
                            value={formData.driverlocation || ""}
                            onChange={handleChange}
                            placeholder="Location"
                        />
                    </div>

                    {/* License & Vehicle */}
                    <div className="space-y-2">
                        <h2 className="font-semibold text-lg">License & Vehicle</h2>
                        <Input
                            name="licenseNumber"
                            value={formData.licenseNumber || ""}
                            onChange={handleChange}
                            placeholder="License Number"
                        />
                        <Input
                            name="vehicleType"
                            value={formData.vehicleType || ""}
                            onChange={handleChange}
                            placeholder="Vehicle Type"
                        />
                        <Input
                            name="vehicleModel"
                            value={formData.vehicleModel || ""}
                            onChange={handleChange}
                            placeholder="Vehicle Model"
                        />
                        <Input
                            name="vehiclePlate"
                            value={formData.vehiclePlate || ""}
                            onChange={handleChange}
                            placeholder="Vehicle Plate"
                        />
                    </div>

                    {/* Status & Approval */}
                    <div className="space-y-2">
                        <h2 className="font-semibold text-lg">Status & Approval</h2>

                        <div className="flex flex-col gap-2">
                            <label>Status</label>
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

                        <div className="flex flex-col gap-2">
                            <label>Approval</label>
                            <select
                                name="isApproved"
                                value={formData.isApproved ? "true" : "false"}
                                onChange={handleChange}
                                className="border rounded-md p-2"
                            >
                                <option value="true">Approved</option>
                                <option value="false">Pending</option>
                            </select>
                        </div>
                    </div>

                    {/* Actions */}
                    <DialogFooter className="flex justify-end gap-2">
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update"}
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateDriverModal;
