import React from "react";
import UseAuth from "../Hooks/UseAuth";
import Loader from "../Pages/Shared/Loader/Loader";
import { Navigate } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = UseAuth();
  if (loading) return <Loader></Loader>;
  if (!user) {
    <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoutes;
