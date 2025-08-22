/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { cn } from "@/lib/utils";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";


interface RequestRideModalProps {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  refetch : any
}

export function RequestRideModal({
  className,
  isOpen,
  onClose,
  refetch,
}: RequestRideModalProps) {
  const form = useForm({
    defaultValues: {
      pickupLocation: "",
      dropLocation: "",
      price: 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Submitting Ride Request:", data);
    try {
      const res = await axiosInstance.post("/rides/request", data); // ✅ API endpoint
      toast.success("Ride requested successfully!");
      refetch()
      form.reset();
      onClose();
      console.log("Ride request response:", res.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Ride request error:", err);
      toast.error(err?.response?.data?.message || "Failed to request ride");
    }
  };

  if (!isOpen) return null;

  return (
    <div className={cn("p-6", className)}>
      <h2 className="text-xl font-bold mb-4">Request a New Ride</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="dropLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter drop location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pickup location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Request Ride</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
