import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const rutineSlice = createSlice({
  name: "rutineProject",
  initialState,
  reducers: {
    setDataSliceRutine: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataSliceRutine } = rutineSlice.actions;

export default rutineSlice.reducer;

// Selectors
export const selectRutineById = (state, id) =>
  state.rutineProject.data.find((item) => item.id === id);

export const selectAllRutines = (state) => state.rutineProject.data;
