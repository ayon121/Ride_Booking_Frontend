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
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Password from "@/components/ui/Password";
import { toast } from "sonner";

import {
  useUserregisterMutation,
  useDriverregisterMutation,
} from "@/redux/features/auth/auth.api";


const registerSchema = z.object({
  role: z.enum(["rider", "driver"]),
  name: z.string().min(3, "Name is too short").max(50),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password is too short"),
  confirmPassword: z.string().min(8, "Confirm Password is too short"),
  licenseNumber: z.string().optional(),
  vehicleType: z.string().optional(),
  vehicleModel: z.string().optional(),
  vehiclePlate: z.string().optional(),
  driverLocation: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.role === "driver") {
    return data.licenseNumber && data.vehicleType && data.vehicleModel && data.vehiclePlate && data.driverLocation;
  }
  return true;
}, {
  message: "All driver fields are required",
  path: ["licenseNumber"], // can point to first missing field
});


export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [userregister] = useUserregisterMutation();
  const [driverregister] = useDriverregisterMutation();
  const navigate = useNavigate();



  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "rider",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      licenseNumber: "",
      vehicleType: "",
      vehicleModel: "",
      vehiclePlate: "",
      driverLocation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      if (data.role === "rider") {
        console.log({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        await userregister({
          name: data.name,
          email: data.email,
          password: data.password,
        }).unwrap();
      } else {

        const payload = {
          name: data.name,
          email: data.email,
          password: data.password,
          licenseNumber: data.licenseNumber,
          vehicleType: data.vehicleType,
          vehicleModel: data.vehicleModel,
          vehiclePlate: data.vehiclePlate,
          driverlocation: data.driverLocation,
        }
        await driverregister(payload).unwrap();
      }
      toast.success(`Account created successfully as ${data.role}`);
      navigate("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Registration failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register your account</h1>
        <p className="text-sm text-muted-foreground">
          Select your role and enter your details
        </p>
      </div>



      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

            {/* Role Toggle */}
            <div className="flex gap-2 justify-center">
              <Button
                type="button"
                variant={form.getValues("role") === "rider" ? "default" : "outline"}
                onClick={() => form.setValue("role", "rider")}
              >
                Rider Register
              </Button>
              <Button
                type="button"
                variant={form.getValues("role") === "driver" ? "default" : "outline"}
                onClick={() => form.setValue("role", "driver")}
              >
                Driver Register
              </Button>
            </div>

            {/* Common Fields */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@company.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Password {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Driver-specific Fields (show only if role === 'driver') */}
            {form.watch("role") === "driver" && (
              <>
                <FormField
                  control={form.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>License Number</FormLabel>
                      <FormControl>
                        <Input placeholder="DL-123456" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Type</FormLabel>
                      <FormControl>
                        <Input placeholder="Car" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehicleModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Model</FormLabel>
                      <FormControl>
                        <Input placeholder="Toyota Prius" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vehiclePlate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Vehicle Plate</FormLabel>
                      <FormControl>
                        <Input placeholder="DHA-1234" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="driverLocation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Driver Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Dhaka" type="text" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button type="submit" className="w-full">
              Register as {form.watch("role") === "rider" ? "Rider" : "Driver"}
            </Button>
          </form>
        </Form>

      </div>

      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
