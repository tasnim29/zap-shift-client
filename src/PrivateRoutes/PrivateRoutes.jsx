import React from "react";
import UseAuth from "../Hooks/UseAuth";
import Loader from "../Pages/Shared/Loader/Loader";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  if (loading) return <Loader></Loader>;
  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/login" />;
  }
  return children;
};

export default PrivateRoutes;
