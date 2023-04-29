import { useSelector, useDispatch } from "react-redux";
import "../../scss/noResults.scss";
import "../../scss/carrito.scss";
import {
  CContainer,
  CRow,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CImage,
} from "@coreui/react";
import {
  actualizarCarrito,
  eliminarProducto,
  vaciarCarrito,
} from "../../features/producto/productoSlice";
import { useConteo } from "../../hooks/useConteoTotales";

function CartResults({ state }) {
  const dispatch = useDispatch();
  const { totalPagar, totalProductos } = useConteo({ state });

  const columnas = [
    "Imagen",
    "Nombre",
    "Descripcion",
    "Precio",
    "Cantidad",
    "Total",
    "",
  ];

  const handleCantidad = (id, cantidad) => {
    const producto = state.find((pro) => pro.idProducto === id);

    if (producto) {
      const productoActualizado = {
        ...producto,
        cantidad: cantidad,
        total: parseFloat((cantidad * producto.precio).toFixed(2)),
      };
      dispatch(actualizarCarrito(productoActualizado));
    }
  };

  return (
    <CContainer className="container_carrito">
      <CRow className="row_carrito">
        <CTable small bordered caption="top" responsive align="middle">
          <CTableHead color="dark">
            <CTableRow>
              {columnas.map((columna, index) => (
                <CTableHeaderCell scope="col" key={index}>
                  {columna}
                </CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {state.map((producto) => (
              <CTableRow key={producto.idProducto}>
                <CTableDataCell className="w-20">
                  <CImage src={producto.imagen} />
                </CTableDataCell>
                <CTableDataCell>{producto.nombreProducto}</CTableDataCell>
                <CTableDataCell>{producto.descripcion}</CTableDataCell>
                <CTableDataCell>${producto.precio}</CTableDataCell>
                <CTableDataCell>
                  <div className="botones-sumar-restar">
                    <div>{producto.cantidad}</div>
                    <div className="sumar-restar">
                      <button
                        onClick={() =>
                          handleCantidad(
                            producto.idProducto,
                            producto.cantidad + 1
                          )
                        }
                        className="button_carrito"
                      >
                        +
                      </button>
                      {producto.cantidad === 1 ? (
                        <button
                          onClick={() => handleCantidad(producto.idProducto, 1)}
                          className="button_carrito"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleCantidad(
                              producto.idProducto,
                              (producto.cantidad || 0) - 1
                            )
                          }
                          className="button_carrito"
                        >
                          -
                        </button>
                      )}
                    </div>
                  </div>
                </CTableDataCell>
                <CTableDataCell>${producto.total}</CTableDataCell>
                <CTableDataCell>
                  <button
                    className="button_carrito"
                    onClick={() =>
                      dispatch(eliminarProducto(producto.idProducto))
                    }
                  >
                    X
                  </button>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <div className="resumen">
          <div className="resumen__info">
            <div className="resumen__info__1">
              <span>Total:</span>
              <span>Cantidad: </span>
            </div>
            <div className="resumen__info__2">
              <span>
                <b>${totalPagar}</b>
              </span>
              <span>
                <b>{totalProductos}</b>
              </span>
            </div>
          </div>
          <div className="pago">
            <button
              className="pago__vaciar-carrito"
              onClick={() => dispatch(vaciarCarrito())}
            >
              Vaciar carrito
            </button>
            <button className="pago__pagar">Pagar</button>
          </div>
        </div>
      </CRow>
    </CContainer>
  );
}

function NoCartResults() {
  return (
    <div className="container_carrito_vacio">
      <h5 className="h5">Tu carrito está vacío...</h5>
    </div>
  );
}

export function Carrito() {
  const state = useSelector((state) => state.productos);

  return state.length > 0 ? <CartResults state={state} /> : <NoCartResults />;
}

export default Carrito;
