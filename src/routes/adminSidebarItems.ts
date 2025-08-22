
// import Analytics from "@/pages/Admin/Analytics";
import AllDrivers from "@/pages/Admin/AllDrivers";
import AllRiders from "@/pages/Admin/AllRiders";
import AllRides from "@/pages/Admin/AllRides";
import Profile from "@/pages/Profile";
import { ISidebarItem } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Ride Management",
    items: [
      {
        title: "All Riders",
        url: "/admin/allriders",
        component: AllRiders,
      },
      {
        title: "All Drivers",
        url: "/admin/alldrivers",
        component: AllDrivers,
      },
      {
        title: "All Rides",
        url: "/admin/allrides",
        component: AllRides,
      },
      {
        title: "My Profile",
        url: "/admin/profile",
        component: Profile
      },
    ],
  },
];
