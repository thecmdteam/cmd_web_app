import { createAsyncThunk } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import axios from "axios";
import { Buffer } from "buffer";
import { LocalStorage } from "../../services";
import { USER_GITHUB_ID, USER_LOGIN_ID, TOKEN, SERVER_URL, APP_URL, OPEN_ID, GRANT_TYPE } from "../../utils/constants";

const getUrl = (url, params) => {
  return `${url}${addParams(params)}`
}

function addParams(params) {
  let addedParams;
  Object.keys(params).forEach((value, index) => {
    addedParams = `${addedParams}&${value}=${params[value]}`
  })
  return addedParams;
}

export const loginUser = createAsyncThunk(
  USER_LOGIN_ID,
  async ({ authCode, codeVerifier }, { rejectWithValue, fulfillWithValue }) => {
    const params = {
      client_id: `${process.env.REACT_APP_CMD_CLIENT_ID}`,
      scope: OPEN_ID,
      code_verifier: `${codeVerifier}`,
      code: `${authCode}`,
      grant_type: GRANT_TYPE,
      redirect_uri: APP_URL
    }

    const url = getUrl(SERVER_URL, params);
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
      LocalStorage.set(TOKEN, JSON.stringify(token.data))

      return fulfillWithValue(token.data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

export const getGithubAuthToken = createAsyncThunk(
  USER_GITHUB_ID,
  async (code, { rejectWithValue, fulfillWithValue }) => {
    try {
      const url = `https://cmd-github-service.herokuapp.com/get-auth-token/${code}`;
      const token = await axios.get(url);
      LocalStorage.clear()
      LocalStorage.set("github-token", token.data);

      return fulfillWithValue(token.data);
    } catch (error) {
      return rejectWithValue(error.message);
    }

    //return rejectWithValue(error.message);
  }
);