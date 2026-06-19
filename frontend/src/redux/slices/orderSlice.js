import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// Fetch orders by userID
export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  try {
    // Get - server request
    const response = await axios.get(
      "http://localhost:5000/api/order/my-orders",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );

    return response.data;
  } catch (error) {
      toast.error(error?.response?.data?.msg || "Fetch orders by userID Failed")
  }
});

// Fetch single order details by orderID
export const fetchSingleOrder = createAsyncThunk(
  "order/fetchSingleOrder",
  async (id) => {
    try {
      // Get - server request
      const response = await axios.get(
        `http://localhost:5000/api/order/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Fetch single order details by orderID Failed")

    }
  },
);

// orderSlice
export const orderSlice = createSlice({
  name: "order",
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
      // fetchOrders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      // fetchSingleOrder
      .addCase(fetchSingleOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});
