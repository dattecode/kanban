import { configureStore } from "@reduxjs/toolkit";
import structureReducer from "./structureSlice";
import rutineReducer from "./rutineSlice";
import progressReducer from "./progressSlice";
import taskReducer from "./taskSlice";

export const store = configureStore({
  reducer: {
    structureProject: structureReducer,
    rutineProject: rutineReducer,
    progressProject: progressReducer,
    taskProject: taskReducer,
  },
});

