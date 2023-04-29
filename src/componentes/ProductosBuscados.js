import { useParams } from "react-router-dom";
import { useSearchProducts } from "../hooks/useSearchProducts";
import { Productos } from "./Productos";

function ProductosBuscados() {
  const { categoriaId, busqueda } = useParams();

  const { productos } = useSearchProducts({ busqueda, categoriaId });

  return <Productos productos={productos} />;
}

export default ProductosBuscados;
