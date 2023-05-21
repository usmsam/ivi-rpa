import { api } from "../index";
import { api_file } from "./../file.js";
import { endpoints } from "../endpoints";

export const getProxies = () => {
  return api.get(endpoints.proxies);
};
export const proxieDelete = (id) => {
  return api.delete(endpoints.proxieDelete(id));
};
export const uploadProxy = (file) => {
  return api_file.post(endpoints.uploadProxy, file);
};
