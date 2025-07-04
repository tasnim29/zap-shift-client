import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://zap-shift-server-roan.vercel.app`,
});

const UseAxios = () => {
  return axiosInstance;
};

export default UseAxios;
