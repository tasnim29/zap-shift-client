import { createBrowserRouter } from "react-router";
import RootLayouts from "../Layouts/RootLayouts";
import Home from "../Pages/Home/Home/Home";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Auth/Login/Login";

import Coverage from "../Pages/Coverage/Coverage";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoutes from "../PrivateRoutes/PrivateRoutes";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashBoardLayouts from "../Layouts/DashBoardLayouts";
import MyParcels from "../Pages/DashBoard/MyParcels/MyParcels";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import TrackParcel from "../Pages/DashBoard/TrackParcel/TrackParcel";
import BeARider from "../Pages/DashBoard/BeARider/BeARider";
import PendingRiders from "../Pages/DashBoard/PendingRiders/PendingRiders";
import ApprovedRiders from "../Pages/DashBoard/ApprovedRiders/ApprovedRiders";
import MakeAdmin from "../Pages/DashBoard/MakeAdmin/MakeAdmin";
import Forbidden from "../Pages/Forbidden/Forbidden";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import AssignRider from "../Pages/DashBoard/AssignRider/Assignrider";
import RiderRoute from "../PrivateRoutes/RiderRoute";
import PendingDeliveries from "../Pages/DashBoard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../Pages/DashBoard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../Pages/DashBoard/MyEarnings/MyEarnings";
import DashBoardHome from "../Pages/DashBoard/DashBoardHome/DashBoardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/coverage",
        loader: () => fetch("./serviceCenter.json"),
        Component: Coverage,
      },
      {
        path: "/forbidden",

        Component: Forbidden,
      },
      {
        path: "/sendParcel",
        loader: () => fetch("./serviceCenter.json"),
        element: (
          <PrivateRoutes>
            <SendParcel></SendParcel>
          </PrivateRoutes>
        ),
      },
      {
        path: "/beARider",
        loader: () => fetch("./serviceCenter.json"),
        element: (
          <PrivateRoutes>
            <BeARider></BeARider>
          </PrivateRoutes>
        ),
      },
    ],
  },
  // authLayout
  {
    path: "/",
    Component: AuthLayouts,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivateRoutes>
        <DashBoardLayouts></DashBoardLayouts>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashBoardHome,
      },
      {
        path: "myParcels",
        Component: MyParcels,
      },
      {
        path: "payment/:parcelId",
        Component: Payment,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "track",
        Component: TrackParcel,
      },
      // rider routes
      {
        path: "pending-deliveries",
        element: (
          <RiderRoute>
            <PendingDeliveries></PendingDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "completed-deliveries",
        element: (
          <RiderRoute>
            <CompletedDeliveries></CompletedDeliveries>
          </RiderRoute>
        ),
      },
      {
        path: "myEarnings",
        element: (
          <RiderRoute>
            <MyEarnings></MyEarnings>
          </RiderRoute>
        ),
      },
      // admin routes
      {
        path: "pendingRiders",
        element: (
          <AdminRoute>
            <PendingRiders></PendingRiders>
          </AdminRoute>
        ),
      },
      {
        path: "approvedRiders",
        element: (
          <AdminRoute>
            <ApprovedRiders></ApprovedRiders>
          </AdminRoute>
        ),
      },
      {
        path: "makeAdmin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "assignRider",
        element: (
          <AdminRoute>
            <AssignRider></AssignRider>
          </AdminRoute>
        ),
      },
    ],
  },
]);
