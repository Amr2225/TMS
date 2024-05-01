import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import authApi from "../apis/authApi";
import taskApi from "../apis/taskApi";
import projectsApi from "../apis/projectsApi";
import UserReducer from "./UserReducer";
import taskReducer from "./taskReducer";
import authReducer from "./authReducer";
import projectsReducer from "./projectsReducer";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    authApi.reducerPath,
    taskApi.reducerPath,
    projectsApi.reducerPath,
    "tasks",
    "projects",
  ],
};

const rootReducer = combineReducers({
  user: UserReducer, // will be persisted
  auth: authReducer, // will be persisted
  tasks: taskReducer,
  projects: projectsReducer,
  [authApi.reducerPath]: authApi.reducer, // Auth API slice
  [taskApi.reducerPath]: taskApi.reducer, // Task API slice
  [projectsApi.reducerPath]: projectsApi.reducer, // Projects API slice
});

export const persistedReducer = persistReducer(persistConfig, rootReducer);
