import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchLoggedInUserOrders,
  updateUser,
  fetchLoggedInUser,
} from './userAPI';

const initialState = {
  status: 'idle',
  userInfo: null, 
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrders',
  async () => {
    const response = await fetchLoggedInUserOrders();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  // async () => {
  //   const response = await fetchLoggedInUser();
 
  //   return response.data;
  // }
  async (loginInfo, thunkAPI) => {
    try {
      const email= loginInfo
    
      console.log("userdata", loginInfo);
      const response = await fetch(`http://localhost:4000/users/fetchUserById/${email}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(loginInfo),
      });
      
      let data = await response.json();
      console.log(data, "api");
      
      if (response.status === 200) {
        console.log(data);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data); 
      }
    } catch (error) {
      console.log(error, "err");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (update) => {
  
    const response = await updateUser(update);
   
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action.payload)
        state.userInfo.orders = action.payload;

      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
         
        // state.userInfo = action.payload;
        state.userInfo=action.meta.arg.addresses
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
       
        state.userInfo = action.payload;
      });
  },
});

export const selectUserOrders = (state) => state.user.userInfo.orders;
export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserInfoStatus = (state) => state.user.status;



export default userSlice.reducer;