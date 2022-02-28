import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Buffer } from "buffer";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (
    { authCode, codeVerifier },
    { rejectWithValue, fulfillWithValue, dispatch }
  ) => {
    const url = `https://cmd-auth.herokuapp.com/oauth2/token?client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_verifier=${codeVerifier}&code=${authCode}&grant_type=authorization_code&redirect_uri=https://cmd-app.netlify.app/login`;
    const auth = `${process.env.REACT_APP_CMD_CLIENT_ID}:${process.env.REACT_APP_CMD_SECRET}`;
    const encodedAuth = Buffer.from(auth).toString("base64");
    try {
      const config = {
        method: "post",
        url,
        headers: {
          Authorization: `Basic ${encodedAuth}`,
        },
      };

      const token = await axios(config);
      localStorage.setItem("token", JSON.stringify(token))

      console.log(token);
      fulfillWithValue(token);
    } catch (error) {
      console.log(error);
      rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    loading: false,
    error: null,
    currentRequestId: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {})
      .addCase(loginUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
        }
      });
  },
});

export default userSlice.reducer;
