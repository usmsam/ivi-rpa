import api from "..";
import { endpoints } from "../endpoints";

export const getScenarios = () => {
  return api.get(endpoints.scenarios);
};
export const getScenarioById = (id) => {
  return api.get(endpoints.getScenarioById(id));
};
export const getScenariosStats = () => {
  return api.get(endpoints.scenarios_stats);
};
export const postScenarios = (data) => {
  return api.post(endpoints.scenarios, data);
};
export const updateScenario = (id, data) => {
  return api.put(endpoints.updateScenario(id), data);
};
export const scenarioEnable = (id) => {
  return api.put(endpoints.scenarioEnable(id));
};
export const scenarioDisable = (id) => {
  return api.put(endpoints.scenarioDisable(id));
};
