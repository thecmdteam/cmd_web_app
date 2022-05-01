import { createAsyncThunk } from "@reduxjs/toolkit";
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