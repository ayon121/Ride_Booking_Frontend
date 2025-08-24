/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  useDriverloginMutation,
  useUserloginMutation,
} from "@/redux/features/auth/auth.api";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { useState } from "react";


export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const form = useForm({});
  const [userlogin] = useUserloginMutation();
  const [driverlogin] = useDriverloginMutation();

  // Track whether logging in as "rider" or "driver"
  const [formrole, setRole] = useState<"rider" | "driver">("rider");

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      let res;

      if (formrole === "rider") {
        res = await userlogin(data).unwrap();
      } else {
        res = await driverlogin(data).unwrap();
      }

      console.log(res);

      if (res.success) {
        // Check for blocked/suspended/deleted
        if (formrole === "driver" && res?.user?.isSuspended) {
          toast.error("Your account is suspended. Contact support.");
          navigate("/suspended");
          return;
        }

        if (formrole === "rider" && res?.user?.isDelete) {
          toast.error("Your account has been deleted. Contact support.");
          navigate("/deleted");
          return;
        }

        // Normal success
        toast.success(`Logged in successfully as ${formrole}`);
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || "Login failed");
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-sm text-muted-foreground">
          Select your role and enter your email & password
        </p>
      </div>

      {/* Role toggle buttons */}
      <div className="flex gap-2 justify-center">
        <Button
          type="button"
          variant={formrole === "rider" ? "default" : "outline"}
          onClick={() => setRole("rider")}
        >
          Rider Login
        </Button>
        <Button
          type="button"
          variant={formrole === "driver" ? "default" : "outline"}
          onClick={() => setRole("driver")}
        >
          Driver Login
        </Button>
      </div>

      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
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
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login as {formrole === "rider" ? "Rider" : "Driver"}
            </Button>
          </form>
        </Form>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}
