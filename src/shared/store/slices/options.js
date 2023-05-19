import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
};

export const optionsSlice = createSlice({
  name: "options",
  initialState,
  reducers: {
    setTagsOptions: (state, action) => {
      state.tags = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setTagsOptions } = optionsSlice.actions;

export default optionsSlice.reducer;
