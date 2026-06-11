import { createSlice } from "@reduxjs/toolkit";

// localStorage - Get or generate theme
const defaultTheme = localStorage.getItem("theme") || "light";
localStorage.setItem("theme", defaultTheme);

// Slice
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: defaultTheme,
  },
  reducers: {
    toggleTheme: (state, action) => {
      state.theme = action.payload || "light";
      localStorage.setItem("theme", action.payload || "light");
    },
  },
});




// Btn for dark mode Swtich