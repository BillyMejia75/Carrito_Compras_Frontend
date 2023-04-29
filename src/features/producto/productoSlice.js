import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const productoSlice = createSlice({
  name: "productos",
  initialState,
  reducers: {
    agregarProducto: (state, action) => {
      let existe = state.findIndex(
        (producto) => producto.idProducto === action.payload.idProducto
      );
      if (existe >= 0) {
        //alert("Ya se agregó al carrito");
      } else {
        state.push(action.payload);
      }
    },

    eliminarProducto: (state, action) => {
      return state.filter((producto) => producto.idProducto !== action.payload);
    },

    actualizarCarrito: (state, action) => {
      const productoActualizado = {
        ...action.payload,
        cantidad: action.payload.cantidad,
        total: action.payload.total,
      };

      return state.map((producto) =>
        producto.idProducto === productoActualizado.idProducto
          ? productoActualizado
          : producto
      );
    },

    vaciarCarrito: () => {
      return [];
    },
  },
});

export const {
  agregarProducto,
  eliminarProducto,
  actualizarCarrito,
  vaciarCarrito,
} = productoSlice.actions;

export default productoSlice.reducer;
