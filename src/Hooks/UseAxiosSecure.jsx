import axios from "axios";
import React from "react";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: `https://zap-shift-server-roan.vercel.app`,
});

const UseAxiosSecure = () => {
  const { user, logOutUser } = UseAuth();
  const navigate = useNavigate();

  // request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response interceptor
  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      console.log("error from res interceptor", error.status);
      const status = error.status;
      if (status === 403) {
        navigate("/forbidden");
      } else if (status === 401) {
        logOutUser(() => {
          navigate("/login");
        });
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default UseAxiosSecure;
