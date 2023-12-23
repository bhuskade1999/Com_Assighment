import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:4000",
});

API.interceptors.request.use(
  (config) => {
    config.headers["token"] = `${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
