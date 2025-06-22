import React from "react";
import { Outlet } from "react-router";
import authImage from "../assets/authImage.png";
import Logo from "../Pages/Shared/Logo/Logo";

const AuthLayouts = () => {
  return (
    <div className="">
      <div className="p-12">
        <Logo></Logo>
      </div>
      {/* full body */}
      <div className="max-w-7xl mx-auto">
        <div
          className="hero-content flex-col lg:flex-row-reverse px-4 lg:pl-40 lg:pr-12
"
        >
          {/* image */}
          <div className="flex-1">
            <img src={authImage} className="max-w-sm rounded-lg " />
          </div>

          {/* changeable side */}
          <div className="flex-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayouts;
