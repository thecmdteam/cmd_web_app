import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Buffer } from "buffer";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ authCode, codeVerifier }, { rejectWithValue, fulfillWithValue }) => {
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
      localStorage.setItem("token", JSON.stringify(token.data));

      return fulfillWithValue(token.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getGithubAuthToken = createAsyncThunk(
  "user/getGithubToken",
  async (code, { rejectWithValue, fulfillWithValue }) => {
    try {
      const url = `https://cmd-github-service.herokuapp.com/get-auth-token/${code}`;
      const token = await axios.get(url);
      localStorage.clear();
      localStorage.setItem("github-token", token.data);

      return fulfillWithValue(token.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }

    //return rejectWithValue(error.message);
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
      .addCase(loginUser.pending, (state, action) => {
        if (!state.loading) {
          setState(state, "pending", {
            data: null,
            error: null,
            requestId: action.meta.requestId,
          });
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          setState(state, "success", {
            data: action.payload,
            requestId: action.meta.requestId,
            error: null,
          });
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (state.loading && state.currentRequestId === requestId) {
          setState(state, "success", {
            data: action.payload,
            requestId: action.meta.requestId,
            error: action.error,
          });
        }
      })
      .addCase(getGithubAuthToken.pending, (state, action) => {
        if (!state.loading) {
          setState(state, "pending", {
            data: null,
            requestId: action.meta.requestId,
            error: null,
          });
        }
      })
      .addCase(getGithubAuthToken.fulfilled, (state, action) => {
        setState(state, "success", {
          data: action.payload,
          requestId: action.meta.requestId,
          error: null,
        });
      })
      .addCase(getGithubAuthToken.rejected, (state, action) => {
        setState(state, "rejected", {
          data: action.payload,
          requestId: action.meta.requestId,
          error: action.error,
        });
      });
  },
});

const setState = (state, type, { data, requestId, error }) => {
  switch (type) {
    case "pending":
      state.loading = true;
      state.error = null;
      state.data = null;
      state.currentRequestId = requestId;
    default:
      state.loading = false;
      state.error = error;
      state.data = data;
      state.currentRequestId = requestId;
  }
};

export default userSlice.reducer;
