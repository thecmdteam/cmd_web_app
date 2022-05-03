import { createSlice } from "@reduxjs/toolkit";
import {
  getGithubAuthTokenFulfilled,
  getGithubAuthTokenPending,
  getGithubAuthTokenRejected,
  loginUserFulfilled,
  loginUserPending,
  loginUserRejected,
} from "./authentication.types";

import { getGithubAuthToken, loginUser } from './authentication.actions'

const USER_TASK_ID = "user"

const initialState = {
  data: null,
  loading: false,
  error: null,
  currentRequestId: "",
};

const authenticationSlice = createSlice({
  name: USER_TASK_ID,
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

export default authenticationSlice.reducer;