// Redux "store" Cofniguration. - Will set up Redux Store
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/atuhSlice";

// Creating Redux store.
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
