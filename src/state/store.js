import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menu/menuSlice.js";
import userReducer from "./user/userSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer
  },
});

export default store;