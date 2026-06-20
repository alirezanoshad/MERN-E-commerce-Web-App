import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// AsyncThunk - Checkout session
export const createCheckout = createAsyncThunk(
  "checkout/createCheckout",
  async ({ cartData, shippingAddress }) => {
    try {
      // Post - server request
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/payment/paymentAsli`,
        { cartData, shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      window.location.href = `https://sandbox.zarinpal.com/pg/StartPay/${response.data.authority}`;
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Checkout session Failed");
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
      })
      .addCase(createCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});
