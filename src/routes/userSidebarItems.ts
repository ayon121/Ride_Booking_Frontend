
import Profile from "@/pages/Profile";
import RideHistory from "@/pages/RideHistory";
import MyRides from "@/pages/User/Rides";
import { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "History",
    items: [
      {
        title: "My Rides",
        url: "/user/myrides",
        component: MyRides,
      },
      {
        title: "My Profile",
        url: "/user/profile",
        component: Profile
      },
      {
        title: "Ride History",
        url: "/user/ridehistory",
        component: RideHistory
      },
    ],
  },
];
