import Axios from "axios";

export * from "./endpoints";

export const BASE_DOMAIN = "https://194.87.111.100:8000/";

export const api = Axios.create({
  baseURL: `${BASE_DOMAIN}`,
  headers: {
    "Content-Type": "application/json",
  },

  withCredentials: false,
});

export default api;
