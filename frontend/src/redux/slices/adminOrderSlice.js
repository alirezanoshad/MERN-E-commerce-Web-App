import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch orders
export const fetchAllOrders = createAsyncThunk(
  "adminOrder/fetchAllOrders",
  async () => {
    try {
      // Get - server request
      const response = await axios.get(
        "http://localhost:5000/api/admin/orders",
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

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, status }) => {
    try {
      console.log({ id, status });
      // Get - server request
      const response = await axios.put(
        `http://localhost:5000/api/admin/orders/${id}`,
        { status },
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

// orderSlice
export const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState: {
    // Order List
    orders: [],
    totalOrders: 0,
    selectedOrder: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllOrders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.orders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      // updateOrderStatus
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.selectedOrder = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});
