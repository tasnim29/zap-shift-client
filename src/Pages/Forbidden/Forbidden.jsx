import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white text-center px-6">
      <FaLock className="text-6xl text-red-500 mb-4" />
      <h1 className="text-5xl font-bold mb-2">403 - Forbidden</h1>
      <p className="text-lg mb-6 max-w-xl">
        You don’t have permission to access this page. If you believe this is an
        error please contact the administrator.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-primary hover:bg-primary/80 text-white rounded-md font-semibold transition duration-300"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default Forbidden;
