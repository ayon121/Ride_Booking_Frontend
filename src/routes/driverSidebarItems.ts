

import AllRides from "@/pages/Driver/AllRides";
import DriverRides from "@/pages/Driver/DriverRides";
import Profile from "@/pages/Profile";
import RideHistory from "@/pages/RideHistory";
import { ISidebarItem } from "@/types";


export const driverSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
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
    ],
  },
];
