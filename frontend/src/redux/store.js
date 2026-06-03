// Redux "store" Cofniguration. - Will set up Redux Store
import { configureStore } from "@reduxjs/toolkit";
// import Redux Slices
import { authSlice } from "./slices/atuhSlice";
import { productsSlice } from "./slices/productsSlice";
import { cartSlice } from "./slices/cartSlice";
import { adminSlice } from "./slices/adminSlice";

// Creating Redux store.
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    admin: adminSlice.reducer,
  },
});
// Export Redux Store => to be used All across The Application.
export default store;
