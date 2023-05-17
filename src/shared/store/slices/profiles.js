import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profiles: [],
};

export const profilesSlice = createSlice({
  name: "profiles",
  initialState,
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfiles } = profilesSlice.actions;

export default profilesSlice.reducer;
