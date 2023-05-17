import api from "..";
import { endpoints } from "../endpoints";

export const getProfiles = () => {
  return api.get(endpoints.profiles);
};
export const getProfileByid = (id) => {
  return api.get(endpoints.profileById(id));
};
export const postProfiles = (data) => {
  return api.post(endpoints.profiles, data);
};
export const updateProfile = (id, data) => {
  return api.put(endpoints.profileUpdate(id), data);
};
export const profileDelete = (id) => {
  return api.delete(endpoints.profileDelete(id));
};
