import { createSlice } from '@reduxjs/toolkit';
import { reducers as menuReducers } from './thunks/menu';

const initialMenuState = {
  value:{
    isCollapsed:false,
  }
}

export const menuSlice = createSlice({
  name:"user",
  initialState: initialMenuState,
  reducers:{
    ...menuReducers
  },
});

export const {
  setMenuState,
} = menuSlice.actions;


export default menuSlice.reducer;
