import { configureStore } from "@reduxjs/toolkit";

import counter from "./slices/counter";
import options from "./slices/options";
import profiles from "./slices/profiles";

export const store = configureStore({
  reducer: {
    counter,
    profiles,
    options,
  },
});
