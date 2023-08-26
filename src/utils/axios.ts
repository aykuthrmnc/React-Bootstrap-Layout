import axios, { AxiosInstance } from "axios";
import store from "~/store";
import { userLogoutHandle } from "~/store/apiHandle";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    if (!config.headers.Authorization) {
      const token = store.getState().auth.user?.token;

      if (token) {
        config.headers.Authorization = `Bearer ${encodeURIComponent(token)}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
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

export default instance;
