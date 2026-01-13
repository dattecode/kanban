import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const structureSlice = createSlice({
  name: "structureProject",
  initialState,
  reducers: {
    setDataSliceStructure: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataSliceStructure } = structureSlice.actions;

export default structureSlice.reducer;

// Selectors
export const selectStructureById = (id) => (state) =>
  state.structureProject.data.find((item) => item.id === id);
