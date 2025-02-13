import {
  IconListCheck,
  IconBasket,
  IconLayoutDashboard,
  IconHistory,
  IconBasketSearch,
  IconTruckDelivery,
  IconPackages,
  IconFileDollar,
  IconDevicesMinus,
  IconUsersGroup,
  IconUsers,
  IconArrowBackUp,
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
    id: uniqueId(),
    title: "Return Order",
    icon: IconArrowBackUp,
    href: "/warehouse/return",
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
    icon: IconUsers,
    href: "/system/users",
  },
  {
    id: uniqueId(),
    title: "Customer List",
    icon: IconUsersGroup,
    href: "/system/customers",
  },
];

export default Menuitems;
