import axios from "axios";
import { SERVER_URL } from "../util/Constants";

let axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || SERVER_URL,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    if (typeof window !== "undefined") {
      let tokenData = {};
      try {
        const tokensString = localStorage.getItem("tokens");
        if (tokensString) {
          tokenData = JSON.parse(tokensString);
        }
      } catch (error) {
        console.error("Failed to parse tokens from localStorage", error);
      }

      if (tokenData && tokenData.stringEncodedAccess) {
        config.headers["Authorization"] = "Bearer " + tokenData.stringEncodedAccess;
      }
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;
