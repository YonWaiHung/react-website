// eslint-disable-next-line no-unused-vars
import React from "react";
import { MdHome, MdFormatListBulleted, MdColorLens, MdLogout } from "react-icons/md";

const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <MdHome />,
  },
  {
    title: "Tech List",
    path: "/tech-list",
    icon: <MdFormatListBulleted />,
  },
  {
    title: "Color Picker",
    path: "/color-picker",
    icon: <MdColorLens />,
  },
  {
    title: "Logout",
    path: "#",
    icon: <MdLogout />,
  },
];

export default SidebarData