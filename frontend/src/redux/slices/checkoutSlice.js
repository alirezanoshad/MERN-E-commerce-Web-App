import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk - Checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async ({ cartData, shippingAddress }) => {
    try {
      console.log({ cartData, shippingAddress });
      // Post - server request
      const response = await axios.post(
        "http://localhost:5000/api/payment/paymentAsli",
        { cartData, shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

// SLice - checkoutSlice
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState: {
    checkout: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(createCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkout = action.payload;
        console.log(state.checkout);
        console.log(state.checkout.authority);
        // window.location.href = `https://sandbox.zarinpal.com/pg/StartPay/${state.checkout.authority}`;
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});
