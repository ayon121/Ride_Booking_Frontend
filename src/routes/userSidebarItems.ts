
import Profile from "@/pages/Profile";
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
    ],
  },
];
