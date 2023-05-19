import api from "..";
import { endpoints } from "../endpoints";

export const getProxies = () => {
  return api.get(endpoints.proxies);
};
export const proxieDelete = (id) => {
  return api.delete(endpoints.proxieDelete(id));
};
