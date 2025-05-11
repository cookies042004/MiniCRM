import axios from "axios";

const authAxios = axios.create({
  baseURL: "https://minicrm-1-zxyz.onrender.com/api",
});


authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default authAxios;
