
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
    ],
  },
];
