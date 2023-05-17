import api from "..";
import { endpoints } from "../endpoints";

export const getScenarios = () => {
  return api.get(endpoints.scenarios);
};
export const getScenariosStats = () => {
  return api.get(endpoints.scenarios_stats);
};
export const postScenarios = (data) => {
  return api.post(endpoints.scenarios, data);
};
