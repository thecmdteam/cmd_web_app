import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ authCode, codeVerifier }, { rejectWithValue, fulfillWithValue, dispatch }) => {
      try {
        const token = await axios.post(`https://cmd-auth.herokuapp.com/oauth2/token?client_id=${process.env.REACT_APP_CMD_CLIENT_ID}&scope=openid&code_verifier=${codeVerifier}&code=${authCode}&grant_type=authorization_code`, { 
          
         }, {
           headers: {
             "Access-Control-Allow-Origin": "https://cmd-app.netlify.app"
           }
         });
        console.log("Nice")
        console.log(token)
        fulfillWithValue(token)
      } catch (error) {
        console.log(error)
        rejectWithValue(error.message)
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
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state, action) => {
          
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          const { requestId } = action.meta;
          if (state.loading && state.currentRequestId === requestId) {
            
          }
        })
        .addCase(loginUser.rejected, (state, action) => {
          const { requestId } = action.meta;
          if (state.loading && state.currentRequestId === requestId) {
            
          }
        })
    },
  });
  
  export default userSlice.reducer;
  