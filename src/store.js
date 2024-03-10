import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import SearchSlice from "./features/layout/SearchSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    search: SearchSlice,
  },
});

export default store;
