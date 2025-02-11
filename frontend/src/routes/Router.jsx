import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import CreateOrder from "../views/product/CreateProduct.jsx";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const ProductRoute = Loadable(
  lazy(() => import("../views/product/ProductPage"))
);
const UserRoute = Loadable(lazy(() => import("../views/system/UserPage.jsx")));
const CustomerRoute = Loadable(
  lazy(() => import("../views/system/CustomerPage.jsx"))
);
const SalePage = Loadable(lazy(() => import("../views/sale/CreateOrder.jsx")));
const SaleHistoryPage = Loadable(
  lazy(() => import("../views/sale/SalesHistory.jsx"))
);
const Icons = Loadable(lazy(() => import("../views/icons/Icons")));
const TypographyPage = Loadable(
  lazy(() => import("../views/utilities/TypographyPage"))
);
const Shadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      { path: "/dashboard", exact: true, element: <Dashboard /> },
      { path: "/products", exact: true, element: <ProductRoute /> },
      { path: "/products/create", exact: true, element: <CreateOrder /> },
      { path: "/system/users", exact: true, element: <UserRoute /> },
      { path: "/system/customers", exact: true, element: <CustomerRoute /> },
      { path: "/sales/create", exact: true, element: <SalePage /> },
      { path: "/sales/history", exact: true, element: <SaleHistoryPage /> },
      { path: "/icons", exact: true, element: <Icons /> },
      { path: "/ui/typography", exact: true, element: <TypographyPage /> },
      { path: "/ui/shadow", exact: true, element: <Shadow /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
