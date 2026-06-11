import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// Fetch single order details by orderID
export const fetchSingleOrder = createAsyncThunk(
  "order/fetchSingleOrder",
  async (id) => {
    try {
      console.log(id);
      // Get - server request
      const response = await axios.get(
        `http://localhost:5000/api/order/${id}`,
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
        console.log(action.payload);
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
        console.log(action.payload);
        state.selectedOrder = action.payload;
      })
      .addCase(fetchSingleOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});
