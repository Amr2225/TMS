import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./reducers/persistedReducer";
import authApi from "./apis/authApi";
import taskApi from "./apis/taskApi";
import projectsApi from "./apis/projectsApi";

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(authApi.middleware)
      .concat(taskApi.middleware)
      .concat(projectsApi.middleware), // Configure middleware for caching
});

export const persistor = persistStore(store);
