import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { journalSlice } from "./journal";
import { navbarSlice } from "./navbar/navbarSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    journal: journalSlice.reducer,
    navbar: navbarSlice.reducer,
  },
});
