
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { axiosInstance } from "@/lib/axios";

interface RequestRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
}

export function RequestRideModal({ isOpen, onClose, refetch }: RequestRideModalProps) {
  const RATE_PER_KM = 100;

  const form = useForm({
    defaultValues: {
      pickupLocation: "",
      dropLocation: "",
      estimatedKm: 0,
      price: 0,
    },
  });

  const [fare, setFare] = useState(0);

  // Update fare whenever estimatedKm changes
  useEffect(() => {
    const estimatedKm = form.watch("estimatedKm") || 0;
    const calculatedFare = estimatedKm * RATE_PER_KM;
    setFare(calculatedFare);
    form.setValue("price", calculatedFare);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("estimatedKm") ]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      await axiosInstance.post("/rides/request", data);
      toast.success(`Ride requested successfully! Fare: ${data.price} TK`);
      refetch();
      form.reset();
      setFare(0);
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to request ride");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="p-6 space-y-4 max-w-4xl ">
      <h2 className="text-xl font-bold text-foreground">Request a New Ride</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Pickup Location */}
          <FormField
            control={form.control}
            name="pickupLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pickup Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pickup location" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Drop Location */}
          <FormField
            control={form.control}
            name="dropLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Drop Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter drop location" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Estimated Kilometers */}
          <FormField
            control={form.control}
            name="estimatedKm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Estimated Kilometers</FormLabel>
                <FormControl>
                  <Input type="number" min={0} {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Fare Display */}
          <FormField
            control={form.control}
            name="price"
            render={() => (
              <FormItem>
                <FormLabel>Fare (TK)</FormLabel>
                <FormControl>
                  <Input value={fare} readOnly />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Confirm Ride</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
