import { createSlice } from "@reduxjs/toolkit";
import { getGithubAuthToken, loginUser } from "./UserMethods";
import {
  getGithubAuthTokenFulfilled,
  getGithubAuthTokenPending,
  getGithubAuthTokenRejected,
  loginUserFulfilled,
  loginUserPending,
  loginUserRejected,
} from "./UserTypes";

const initialState = {
  data: null,
  loading: false,
  error: null,
  currentRequestId: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, loginUserPending)
      .addCase(loginUser.fulfilled, loginUserFulfilled)
      .addCase(loginUser.rejected, loginUserRejected)
      .addCase(getGithubAuthToken.pending, getGithubAuthTokenPending)
      .addCase(getGithubAuthToken.fulfilled, getGithubAuthTokenFulfilled)
      .addCase(getGithubAuthToken.rejected, getGithubAuthTokenRejected);
  },
});

export default userSlice.reducer;
