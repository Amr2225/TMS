import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthed: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthed = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export default authSlice.reducer;
