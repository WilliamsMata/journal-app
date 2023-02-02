import { createSlice } from "@reduxjs/toolkit";

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    isOpen: false,
  },
  reducers: {
    openNavbar: (state) => {
      state.isOpen = true;
    },
    closeNavbar: (state) => {
      state.isOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { openNavbar, closeNavbar } = navbarSlice.actions;
