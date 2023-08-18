import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {loginUser, createUser ,checkUser ,updateUser, signOut,resetPassword ,resetPasswordRequest} from './authAPI';

const initialState = {
 loggedInUser: null,
  status: 'idle',
  error: null,
  userChecked: false,
  mailSent: false,
  passwordReset:false
};


export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
  
    return response.data;
   
  }
  // async (userdata, thunkAPI) => {
  //   try {
     
  //     const response = await fetch(`http://localhost:4000/users/createUser`, {
  //       method: "POST",
  //       // headers,
  //       body: JSON.stringify(userdata),
  //     });
  //     let data = await response.json();
  //     if (response.status === 200) {
  //       return data;
  //     } else {
  //       return thunkAPI.rejectWithValue(data); 
  //     }
  //   } catch (error) {
  //     console.log(error, "err");
  //     return thunkAPI.rejectWithValue({ error: error.message });
  //   }
  // }
);
// );
export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginInfo) => {
    const response = await checkUser(loginInfo);
  
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  'auth/updateUser',
  async (update) => {
    const response = await updateUser(update);
  
    return response.data;
  }
);
export const signOutUserAsync = createAsyncThunk(
  'auth/signOutUser',
  async (update) => {
    const response = await signOut(update);
  
    return response.data;
  }
);
export const loginUserAsync = createAsyncThunk(
  'user/loginUser',
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const resetPasswordAsync = createAsyncThunk(
  'user/resetPassword',
  async (data,{rejectWithValue}) => {
    try {
      const response = await resetPassword(data);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);

    }
  }
);
export const resetPasswordRequestAsync = createAsyncThunk(
  'user/resetPasswordRequest',
  async (email,{rejectWithValue}) => {
    try {
      const response = await resetPasswordRequest(email);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);

    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
   
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(createUserAsync.fulfilled, (state, {payload}) => {
        state.status = 'idle';
        console.log(payload)
        state.loggedInUser =payload;
      });
      builder
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(checkUserAsync.rejected,(state,action)=>{
        state.status='idle';
        state.error=action.error;
      })
      builder
      .addCase(loginUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      builder.addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
      builder
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      });
      builder
      .addCase(signOutUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      builder.addCase(signOutUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });
      builder
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload
      })
      builder 
       .addCase(resetPasswordRequestAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetPasswordRequestAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.mailSent = true;
      })
  },
});

// export const { } = counterSlice.actions;


 export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectError=(state)=>state.auth.error;
export const selectPasswordReset = (state) => state.auth.passwordReset;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSent = (state) => state.auth.mailSent;
export default authSlice.reducer;

