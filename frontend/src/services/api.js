import axios from "axios";
import { API_BASE_URL } from "../config/apiUrls";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const backendError = error.response?.data;
    return Promise.reject({
      status: error.response?.status,
      code: backendError?.code || "NETWORK_ERROR",
      message: backendError?.message || "Unable to reach the backend.",
    });
  },
);

export default api;
