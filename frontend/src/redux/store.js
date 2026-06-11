// Redux "store" Cofniguration. - Will set up Redux Store
import { configureStore } from "@reduxjs/toolkit";
// import Redux Slices
import { authSlice } from "./slices/atuhSlice";
import { productsSlice } from "./slices/productsSlice";
import { cartSlice } from "./slices/cartSlice";
import { adminSlice } from "./slices/adminSlice";
import { adminProductsSlice } from "./slices/adminProductsSlice";
import { themeSlice } from "./slices/theme";
import { orderSlice } from "./slices/orderSlice";
import {adminOrderSlice} from "./slices/adminOrderSlice"

// Creating Redux store.
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    admin: adminSlice.reducer,
    adminProducts: adminProductsSlice.reducer,
    order: orderSlice.reducer,
    adminOrder: adminOrderSlice.reducer,
    theme: themeSlice.reducer,
  },
});
// Export Redux Store => to be used All across The Application.
export default store;
