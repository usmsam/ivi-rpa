import api from "..";
import { endpoints } from "../endpoints";

export const getTags = () => {
  return api.get(endpoints.tags);
};
export const getUrls = () => {
  return api.get(endpoints.urls);
};
export const getPlatforms = () => {
  return api.get(endpoints.platforms);
};
export const getEngines = () => {
  return api.get(endpoints.search_engines);
};
