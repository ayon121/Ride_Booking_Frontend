

import AllRides from "@/pages/Driver/AllRides";
import DriverAnalytics from "@/pages/Driver/DriverAnalytics";
import DriverRides from "@/pages/Driver/DriverRides";
import DriverStatus from "@/pages/Driver/DriverStatus";
import Profile from "@/pages/Profile";
import RideHistory from "@/pages/RideHistory";
import { ISidebarItem } from "@/types";


export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "Driver Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/driver/analytics",
        component: DriverAnalytics,
      },
      {
        title: "My Rides",
        url: "/driver/myrides",
        component: DriverRides,
      },
      {
        title: "All Requested Rides",
        url: "/driver/allrides",
        component: AllRides,
      },
      {
        title: "My Profile",
        url: "/driver/profile",
        component: Profile
      },
      {
        title: "Ride History",
        url: "/driver/ridehistory",
        component: RideHistory
      },
      {
        title: "Active Status",
        url: "/driver/status",
        component: DriverStatus
      },
    ],
  },
];
