import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  token: null,
  userinfo: {},
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.userinfo = action.payload.user;
    },
    signout: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userinfo = {};
    },
  },
});
export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;
