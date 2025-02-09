import {
  IconListCheck,
  IconBasket,
  IconLayoutDashboard,
  IconHistory,
  IconBasketSearch,
  IconTruckDelivery,
  IconPackages,
  IconFileDollar,
  IconUser,
  IconDevicesMinus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Inventory",
  },
  {
    id: uniqueId(),
    title: "Create Product",
    icon: IconDevicesMinus,
    href: "/products/create",
  },
  {
    id: uniqueId(),
    title: "Product List",
    icon: IconListCheck,
    href: "/products",
  },
  {
    navlabel: true,
    subheader: "Sale",
  },
  {
    id: uniqueId(),
    title: "Create Sale Order",
    icon: IconBasket,
    href: "/sales/create",
  },
  {
    id: uniqueId(),
    title: "Sale History",
    icon: IconHistory,
    href: "/sales/history",
  },
  {
    id: uniqueId(),
    title: "Create Sale Return",
    icon: IconBasketSearch,
    href: "/sales/return",
  },
  {
    navlabel: true,
    subheader: "Warehouse",
  },
  {
    id: uniqueId(),
    title: "Pending Orders",
    icon: IconPackages,
    href: "/warehouse/pending",
  },
  {
    id: uniqueId(),
    title: "Delivery Records",
    icon: IconTruckDelivery,
    href: "/warehouse/delivery",
  },
  {
    navlabel: true,
    subheader: "Finance",
  },
  {
    id: uniqueId(),
    title: "Create Invoice",
    icon: IconFileDollar,
    href: "/finance/invoice",
  },
  {
    navlabel: true,
    subheader: "System",
  },
  {
    id: uniqueId(),
    title: "User List",
    icon: IconUser,
    href: "/system/users",
  },
  // {
  //   id: uniqueId(),
  //   title: 'Shadow',
  //   icon: IconCopy,
  //   href: '/ui/shadow',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Auth',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Login',
  //   icon: IconLogin,
  //   href: '/auth/login',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Register',
  //   icon: IconUserPlus,
  //   href: '/auth/register',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Extra',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Icons',
  //   icon: IconMoodHappy,
  //   href: '/icons',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Sample Page',
  //   icon: IconAperture,
  //   href: '/sample-page',
  // },
];

export default Menuitems;
