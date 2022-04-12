import { createSlice } from '@reduxjs/toolkit';
import { reducers as userReducers } from './thunks/user';

const initialUserState = {
  value:{
    isAuthenticated:false,
    currentUser: null,
    currentTenant: null,
    isLoading: true,
    permissions: []
  }
}

export const userSlice = createSlice({
  name:"user",
  initialState: initialUserState,
  reducers:{
    ...userReducers
  },
});

export const {
  login,
} = userSlice.actions;


export default userSlice.reducer;
