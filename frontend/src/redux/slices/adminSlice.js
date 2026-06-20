// adminSlice => Users - Ftech, Add, Update, Delete

// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "sonner";

// AsyncThunk - Fech users
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  try {
    // Get - server request
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Fech users Failed");
  }
});

// AsyncThunk - Add user
export const addUser = createAsyncThunk("admin/addUser", async (userData) => {
  try {
    // Post - server request
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/users`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    toast.error(error?.response?.data?.msg || "Add user Failed");
  }
});

// AsyncThunk - Update user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ name, email, role, id }) => {
    try {
      // Put - server request
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/admin/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Update user info Failed");
    }
  },
);

// AsyncThunk - Delete user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ id }) => {
    try {
      // Put - server request
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/admin/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.msg || "User Delete Failed");
    }
  },
);

// AdminSlide
export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    // User List
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedUser = action.payload.user;
        // Find user that needs to be updated by user id
        const userIndex = state.users.findIndex(
          (user) => user && user._id === updatedUser._id,
        );
        if (userIndex !== -1) {
          state.users[userIndex] = updatedUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload.user); // add a new user to the state
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});
