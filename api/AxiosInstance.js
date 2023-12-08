import axios from "axios";
import { SERVER_URL } from "../util/Constants";

let axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    if (typeof window !== "undefined") {
      let tokenData = localStorage.getItem("tokens") ? JSON.parse(localStorage.getItem("tokens")) : {};

      if (tokenData || tokenData !== undefined) {
        config.headers["Authorization"] = "Bearer " + tokenData?.stringEncodedAccess;
      }
      return config;
    }
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
