import axios from "axios";

export const baseUrl = "http://192.168.101.3:1337/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
