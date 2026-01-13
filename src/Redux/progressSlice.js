import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const progressSlice = createSlice({
  name: "progressProject",
  initialState,
  reducers: {
    setDataSliceProgress: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataSliceProgress } = progressSlice.actions;

export default progressSlice.reducer;

// Selectors

export const selectProgressById = (id) => (state) =>
  state.progressProject.data.find((item) => item.id === id);
