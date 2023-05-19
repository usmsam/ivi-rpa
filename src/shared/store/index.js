import { configureStore } from "@reduxjs/toolkit";

import counter from "./slices/counter";
import options from "./slices/options";
import profiles from "./slices/profiles";
import scenarios from "./slices/scenarios";

export const store = configureStore({
  reducer: {
    counter,
    profiles,
    options,
    scenarios,
  },
});
