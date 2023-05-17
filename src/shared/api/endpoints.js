export const endpoints = {
  scenarios_stats: "/scenarios/statistics",
  scenarios: "/scenarios",
  profiles: "/profiles",
  profileUpdate: (id)=>`/profile/${id}`,
  profileDelete: (id)=>`/profile/${id}`,
  profileById: (id) => `/profile/${id}`,
  tags: "/tags",
  platforms: "/platforms",
  search_engines: "/search_engines",
};
