import Axios from "axios";

export * from "./endpoints";

export const BASE_DOMAIN = "https://194.87.111.100:8000/";

export const api_file = Axios.create({
  baseURL: `${BASE_DOMAIN}`,
  // headers: {
  //   Accept: "application/json",
  //   "Content-Type":
  //     "multipart/form-data; boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu",
  // },
  headers: {
    Accept: "application/json",
    "Content-Type":
      "multipart/form-data; boundary=----WebKitFormBoundaryyEmKNDsBKjB7QEqu",
  },
  responseType: "json",
  withCredentials: false,
});
