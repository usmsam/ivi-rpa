import { api } from "../index";
import { endpoints } from "../endpoints";

export const getTags = () => {
  return api.get(endpoints.tags);
};
export const getFrameUrls = () => {
  return api.get(endpoints.frame_urls);
};
export const postFrameUrls = (data) => {
  return api.post(endpoints.frame_urls, data);
};
export const getBlacklistUrls = () => {
  return api.get(endpoints.blacklist_urls);
};
export const getPlatforms = () => {
  return api.get(endpoints.platforms);
};
export const getEngines = () => {
  return api.get(endpoints.search_engines);
};
export const getProfilesThumbnails = () => {
  return api.get(endpoints.profiles_thumbnails);
};
export const getBrowsers = () => {
  return api.get(endpoints.browsers);
};
