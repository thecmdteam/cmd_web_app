import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createUser = createAsyncThunk(
    "user/createUser",
    async (userData, { rejectWithValue, fulfillWithValue, dispatch }) => {
      
      
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
        .addCase(createUser.pending, (state, action) => {
          
        })
        .addCase(createUser.fulfilled, (state, action) => {
          const { requestId } = action.meta;
          if (state.loading && state.currentRequestId === requestId) {
            
          }
        })
        .addCase(createUser.rejected, (state, action) => {
          const { requestId } = action.meta;
          if (state.loading && state.currentRequestId === requestId) {
            
          }
        })
    },
  });
  
  export default userSlice.reducer;
  