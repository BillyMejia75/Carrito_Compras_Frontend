import { useEffect, useState } from "react";

export function useProductos() {
  const urlGetProductos = "https://localhost:7074/api/Productos";

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const getProductos = async (url) => {
      let res = await fetch(url);
      return await res.json();
    };

    let producto = getProductos(urlGetProductos);
    producto.then((res) => {
      res.result.forEach((res) => {
        setProductos((productos) => [...productos, res]);
      });
    });
  }, [urlGetProductos]);

  return { productos };
}
