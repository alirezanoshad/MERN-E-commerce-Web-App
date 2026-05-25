// Authentication Slice - Manages Login and Registeration.

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

// User Login - Async Thunk Function(Redux Tooolkit)
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Checkpoint: send user login data to Server and Wait for result.
      const response = await axios.post("https://httpstat.us/200", userData);
      // If response true, Set User Data In localStorage &
      localStorage.setItem("userInfo", JSON.stringify(response.data.user)); //userInfo
      localStorage.setItem("userToken", response.data.token); // userToken
      return response.data.user; // Return the user object from the response.
    } catch (error) {
      return rejectWithValue(error.response.data); // Will send eror to Redux.
    }
  },
);

// User Register - Async Thunk Function(Redux Tooolkit)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      // send user login data
      const response = await axios.post(
        "https://reqres.in/api/login",
        userData,
      );

      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("userToken", response.data.token);
      return response.data.user; // Return the user object from the response.
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

// Slice - is a way to Group together: States & Reducers & Actions
const authSlice = createSlice({
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

  // Managing AsyncThunk Promise States.
  extraReducers: (builder) => {
    builder
      //// Login States (Pending, Fulfilled, Rejected)
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
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
        state.error = action.payload.message;
      });
  },
});

// Export Actions => So we could use them in our Components.
export const { logout, generateNewGuestId } = authSlice.actions;
// Export Default The Reducers => So it can be added to Redux Store.
export default authSlice.reducer;
