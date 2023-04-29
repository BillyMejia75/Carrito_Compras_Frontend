import { configureStore } from "@reduxjs/toolkit";

import productosReducer from "../features/producto/productoSlice";

export const store = configureStore({
  reducer: {
    productos: productosReducer,
  },
});
