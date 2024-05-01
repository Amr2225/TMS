import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    taskData: [],
    assignedDevelopers: [],
  },
  reducers: {
    setTasksData: (state, action) => {
      state.taskData = action.payload;
    },
    setAssignedDevelopers: (state, action) => {
      state.assignedDevelopers = action.payload;
    },
  },
});

export const { setTasksData, setAssignedDevelopers } = taskSlice.actions;
export default taskSlice.reducer;
