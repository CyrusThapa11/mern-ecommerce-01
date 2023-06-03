import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerUser: (state, action) => {
      console.log(" in registerUser slice action", action);
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    logoutUser: (state, action) => {
      console.log(" in registerUser slice action", action);
      state.isFetching = false;
      state.currentUser = null;
    },
  },
});
console.log("creating user slice !");

export const {
  loginStart,
  logoutUser,
  loginSuccess,
  loginFailure,
  registerUser,
} = userSlice.actions;

export default userSlice.reducer;
