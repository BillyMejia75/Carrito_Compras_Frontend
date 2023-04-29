import { useState, useEffect } from "react";

export function useSearchProducts({ busqueda, categoriaId }) {
  const [productos, setProductos] = useState([]);

  busqueda = busqueda.trim();
  categoriaId = parseInt(categoriaId);

  let urlGetProducts = "https://localhost:7074/api/Productos/buscar?";

  if (categoriaId !== 0 && busqueda !== "") {
    urlGetProducts += `categoriaId=${categoriaId}&busqueda=${busqueda}`;
  } else if (categoriaId !== 0) {
    urlGetProducts += `categoriaId=${categoriaId}`;
  } else if (categoriaId === 0) {
    urlGetProducts += `busqueda=${busqueda}`;
  }

  useEffect(() => {
    const getProductsFounds = async (url) => {
      let res = await fetch(url);
      return await res.json();
    };

    let productos = getProductsFounds(urlGetProducts);
    productos.then((res) => {
      setProductos(res.result);
    });
  }, [urlGetProducts, busqueda, categoriaId]);

  return { productos };
}
