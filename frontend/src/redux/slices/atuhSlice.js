// Authentication Slice - Manages Login and Registeration.

// PopUp Library
import { toast } from "sonner";

// createSlice - Write states, reducers and actions.
// createAsyncThunk - Asyncronous API Calls.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// localStorage - Retrieve userInfo and Token(if available).
// => Preventing User Logout after Refresh.
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// localStorage - Retrieve guestId(if available). or Generate a new one.
// Then, Store guestId in localStorage.
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Inistial State(Object) for authSlice.
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false, // Default
  error: null, // Default
};

// AsyncThunk - User Login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData) => {
    // Login popup - before axios Request.
    const toastLogin = toast.loading("Logining in...");
    try {
      // Checkpoint: send user login data to Server and Wait for result.
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        userData,
      );
      // If response true, Set User Data In localStorage & Display Succes Popup
      localStorage.setItem("userInfo", JSON.stringify(response.data.user)); //userInfo
      localStorage.setItem("userToken", response.data.token); // userToken
      toast.success("Login Successfully!", { id: toastLogin }); // Success popup
      return response.data.user; // Return the user object from the response.
    } catch (error) {
      // Eror Popup
      toast.error("Login Failed! Try Again", {
        id: toastLogin,
      });
      // Eror clg
      toast.error(error?.response?.data?.msg || "User Login Failed");
    }
  },
);

// AsyncThunk - User Register
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }) => {
    // Register popup
    const registerUserPopup = "registerPopup";
    toast.loading("Registering..", { id: registerUserPopup });
    try {
      // send user login data
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        { name, email, password },
      );
      // Set localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      toast.success("Register Succesfully!", { id: registerUserPopup });
      return response.data.user; // Return the user object from the response.
    } catch (error) {
      toast.error(`Register Failed! ${error.response.data.msg}`, {
        id: registerUserPopup,
      });
      toast.error(error?.response?.data?.msg || "User Register Failed");
    }
  },
);

// Auth Slice
// Export, So it can be added to Redux Store.
export const authSlice = createSlice({
  // Slice name
  name: "auth",
  // initial State
  initialState,
  // Reducers object - full of Actions(Case Reducer Functions)
  reducers: {
    // Logout Case Reducer
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`; // Reset Guest ID on logout
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId); // Set New Guest ID in localStorage
    },
    // Generate New Guest Id Case Reducer
    generateNewGuestId: (state) => {
      state.guestId = `guestId_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },

  // Managing AsyncThunk Promise States - Login & Register
  extraReducers: (builder) => {
    builder
      //// Login States (Pending, Fulfilled, Rejected)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      })
      //// Register States (Pending, Fulfilled, Rejected)
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.msg;
      });
  },
});

// Export Actions => So we could use them in our Components.
export const { logout, generateNewGuestId } = authSlice.actions;
