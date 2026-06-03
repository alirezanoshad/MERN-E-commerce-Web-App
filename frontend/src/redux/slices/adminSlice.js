// adminSlice => Users - Ftech, Add, Update, Delete

// Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// AsyncThunk - Fech users
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async () => {
  try {
    // Get - server request
    const response = await axios.get("http://localhost:5000/api/admin", {
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

// AsyncThunk - Add user
export const addUser = createAsyncThunk("admin/addUser", async (userData) => {
  try {
    // Post - server request
    const response = await axios.post(
      "http://localhost:5000/api/admin/users",
      userData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
});

// AsyncThunk - Update user info
export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ name, email, role, id }) => {
    try {
      console.log({ name, email, role, id });
      // Put - server request
      const response = await axios.put(
        `http://localhost:5000/api/admin/${id}`,
        { name, email, role },
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

// AsyncThunk - Delete user
export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ id }) => {
    try {
      console.log(id);
      // Put - server request
      const response = await axios.delete(
        `http://localhost:5000/api/admin/${id}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );

      console.log(response.data);
      console.log(`user #${id} got removed!`);
      return id;
    } catch (error) {
      console.log(error);
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
