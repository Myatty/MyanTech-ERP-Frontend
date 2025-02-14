import {
  IconListCheck,
  IconBasket,
  IconLayoutDashboard,
  IconHistory,
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
    allowedDepts: ["Admin", "Finance", "Sale", "Warehouse"],
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
    allowedDepts: ["Admin", "Finance", "Sale", "Warehouse"],
  },
  {
    navlabel: true,
    subheader: "Inventory",
    allowedDepts: ["Admin", "Warehouse", "Sale"],
  },
  {
    id: uniqueId(),
    title: "Create Product",
    icon: IconDevicesMinus,
    href: "/products/create",
    allowedDepts: ["Admin", "Warehouse"],
  },
  {
    id: uniqueId(),
    title: "Product List",
    icon: IconListCheck,
    href: "/products",
    allowedDepts: ["Admin", "Warehouse", "Sale"],
  },
  {
    navlabel: true,
    subheader: "Sale",
    allowedDepts: ["Admin", "Sale"],
  },
  {
    id: uniqueId(),
    title: "Create Sale Order",
    icon: IconBasket,
    href: "/sales/create",
    allowedDepts: ["Admin", "Sale"],
  },
  {
    id: uniqueId(),
    title: "Sale History",
    icon: IconHistory,
    href: "/sales/history",
    allowedDepts: ["Admin", "Sale"],
  },
  {
    navlabel: true,
    subheader: "Warehouse",
    allowedDepts: ["Admin", "Warehouse"],
  },
  {
    id: uniqueId(),
    title: "Pending Orders",
    icon: IconPackages,
    href: "/warehouse/pending",
    allowedDepts: ["Admin", "Warehouse"],
  },
  {
    id: uniqueId(),
    title: "Delivery Records",
    icon: IconTruckDelivery,
    href: "/warehouse/delivery",
    allowedDepts: ["Admin", "Warehouse"],
  },
  {
    id: uniqueId(),
    title: "Return Order",
    icon: IconArrowBackUp,
    href: "/warehouse/return",
    allowedDepts: ["Admin", "Warehouse"],
  },
  {
    navlabel: true,
    subheader: "Finance",
    allowedDepts: ["Admin", "Finance"],
  },
  {
    id: uniqueId(),
    title: "Invoice List",
    icon: IconFileDollar,
    href: "/finance/invoice",
    allowedDepts: ["Admin", "Finance"],
  },
  {
    navlabel: true,
    subheader: "System",
    allowedDepts: ["Admin"],
  },
  {
    id: uniqueId(),
    title: "User List",
    icon: IconUsers,
    href: "/system/users",
    allowedDepts: ["Admin"],
  },
  {
    id: uniqueId(),
    title: "Customer List",
    icon: IconUsersGroup,
    href: "/system/customers",
    allowedDepts: ["Admin"],
  },
];

export default Menuitems;
