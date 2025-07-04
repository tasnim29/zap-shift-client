import React from "react";
import UseUserRole from "../../../Hooks/UseUserRole";
import Loader from "../../Shared/Loader/Loader";
import UserDash from "./UserDash";
import RiderDash from "./RiderDash";
import AdminDash from "./AdminDash";
import Forbidden from "../../Forbidden/Forbidden";

const DashBoardHome = () => {
  const { role, isLoading } = UseUserRole();
  if (isLoading) {
    return Loader;
  }
  if (role === "user") {
    return <UserDash></UserDash>;
  } else if (role === "rider") {
    return <RiderDash></RiderDash>;
  } else if (role === "admin") {
    return <AdminDash></AdminDash>;
  } else {
    return <Forbidden></Forbidden>;
  }
};

export default DashBoardHome;
