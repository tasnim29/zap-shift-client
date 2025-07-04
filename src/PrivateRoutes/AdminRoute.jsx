import React from "react";
import UseAuth from "../Hooks/UseAuth";
import UseUserRole from "../Hooks/UseUserRole";
import Loader from "../Pages/Shared/Loader/Loader";
import { Navigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const { role, isLoading } = UseUserRole();

  if (loading || isLoading) {
    return Loader;
  }
  if (!user || role !== "admin") {
    return <Navigate state={{ from: location.pathname }} to="/forbidden" />;
  }
  return children;
};

export default AdminRoute;
