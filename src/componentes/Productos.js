import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CCol,
  CContainer,
  CRow,
} from "@coreui/react";
import "../scss/cardProducto.scss";
import "../scss/noResults.scss";

import { useDispatch } from "react-redux";
import {
  agregarProducto,
  eliminarProducto,
} from "../features/producto/productoSlice";
import { useState } from "react";

function BotonAgregarCarrito({ producto }) {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAgregarProducto = () => {
    const fixProduct = {
      ...producto,
      cantidad: 1,
      total: producto.precio,
    };
    dispatch(agregarProducto(fixProduct));
    setAdded(true);
  };

  const handleEliminarProducto = (id) => {
    dispatch(eliminarProducto(id));
    setAdded(false);
  };

  return added ? (
    <CButton onClick={() => handleEliminarProducto(producto.idProducto)}>
      Quitar del carrito
    </CButton>
  ) : (
    <CButton onClick={() => handleAgregarProducto(producto)}>
      Agregar al carrito
    </CButton>
  );
}

function CardProducto({ productos }) {
  return (
    <>
      <h3 className="text-center mb-4">Productos</h3>
      {productos.map((producto) => (
        <CCol xs={3} key={producto.idProducto}>
          <CCard>
            <CCardImage orientation="top" src={producto.imagen} />
            <CCardBody className="text-center card_body">
              <div>
                <CCardTitle>{producto.nombreProducto}</CCardTitle>
                <CCardText>{producto.descripcion}</CCardText>
              </div>
              <div>
                <CCardText>
                  Precio: <b>${producto.precio}</b>
                </CCardText>
                <BotonAgregarCarrito producto={producto} />
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      ))}
    </>
  );
}

function NoResults() {
  return (
    <div className="container_products_no_results">
      <h5 className="h5">Ningun resultado para esta busqueda</h5>
    </div>
  );
}

export function Productos({ productos }) {
  const hasProducts = productos?.length > 0;

  return (
    <CContainer>
      <CRow className="my-5">
        {hasProducts ? <CardProducto productos={productos} /> : <NoResults />}
      </CRow>
    </CContainer>
  );
}
