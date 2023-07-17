import axios from "axios";
import store from "~/store";
import { userLogoutHandle } from "~/utils";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

axios.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = store.getState().auth.user?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    let message;
    switch (error?.response?.status) {
      case 401:
        message = "Yetki Yok";
        userLogoutHandle();
        break;
      case 403:
        message = "Access Forbidden";
        // window.location.href = '/access-denied';
        break;
      case 404:
        message = error?.response?.data;
        // message = "Sorry! The data you are looking for could not be found";
        // window.location.href = '/not-found';
        break;
      case 505:
        window.location.href = "/error-500";
        break;
      default:
        message = error;
    }
    return Promise.reject(message);
  }
);
