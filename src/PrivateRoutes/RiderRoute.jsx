import React from "react";
import UseAuth from "../Hooks/UseAuth";
import UseUserRole from "../Hooks/UseUserRole";
import Loader from "../Pages/Shared/Loader/Loader";

const RiderRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = UseUserRole();

  if (loading || isLoading) {
    return Loader;
  }
  if (!user || role !== "rider") {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }
  return children;
};

export default RiderRoute;
