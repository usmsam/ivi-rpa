import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  scenarios: [],
};

export const scenariosSlice = createSlice({
  name: "scenarios",
  initialState,
  reducers: {
    setScenariosData: (state, action) => {
      state.scenarios = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setScenariosData } = scenariosSlice.actions;

export default scenariosSlice.reducer;
