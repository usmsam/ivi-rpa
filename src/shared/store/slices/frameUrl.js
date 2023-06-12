import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "",
  allFrameUrls: [],
};

export const frameUrlSlice = createSlice({
  name: "frameUrl",
  initialState,
  reducers: {
    setFrameUrl: (state, action) => {
      state.url = action.payload;
    },
    setAllFrameUrls: (state, action) => {
      state.allFrameUrls = action.payload;
    },
  },
});
export const { setFrameUrl, setAllFrameUrls } = frameUrlSlice.actions;

export default frameUrlSlice.reducer;
