import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

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

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Fetch orders Failed");
    }
  },
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "adminOrder/updateOrderStatus",
  async ({ id, status }) => {
    try {
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

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Update order status Failed");
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
        const index = state.orders.findIndex(
          (order) => order._id === action.payload._id,
        );
        state.orders[index] = action.payload;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});
