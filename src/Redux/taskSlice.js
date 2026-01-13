import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const taskSlice = createSlice({
  name: "taskProject",
  initialState,
  reducers: {
    setDataSliceTask: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setDataSliceTask } = taskSlice.actions;

export default taskSlice.reducer;

export const selectedTaskById = (id) => (state) =>
  state.taskProject.data.find((item) => item.id === id);
