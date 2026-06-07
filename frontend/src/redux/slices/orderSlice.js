import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




// Fetch orders
export const fetchOrders = createAsyncThunk("order/fetchOrders", async () => {
  try {
    // Get - server request
    const response = await axios.get("http://localhost:5000/api/..", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});