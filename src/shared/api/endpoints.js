export const endpoints = {
  scenarios_stats: "/scenarios/statistics",
  scenarios: "/scenarios",
  updateScenario: (id) => `/scenario/${id}`,
  getScenarioById: (id) => `/scenario/${id}`,
  profiles: "/profiles",
  profileUpdate: (id) => `/profile/${id}`,
  profileDelete: (id) => `/profile/${id}`,
  profileById: (id) => `/profile/${id}`,
  tags: "/tags",
  urls: "/urls",
  platforms: "/platforms",
  search_engines: "/search_engines",
  proxies: "/proxies",
  proxieDelete: (id) => `/proxie/${id}`,
  scenarioEnable: (id) => `/scenario/${id}/enable`,
  scenarioDisable: (id) => `/scenario/${id}/disable`,
};
