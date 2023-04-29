import { useEffect, useState } from "react";

export function useCategorias() {
  const urlGetCategorias = "https://localhost:7074/api/Categorias";

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const getCategorias = async (url) => {
      let res = await fetch(url);
      return await res.json();
    };

    let categoria = getCategorias(urlGetCategorias);
    categoria.then((res) => {
      res.result.forEach((res) => {
        //Practicando un mappeo de datos
        setCategorias((categorias) => [
          ...categorias,
          {
            id: res.id,
            categoria: res.nombreCategoria,
          },
        ]);
      });
      //setCategorias((categorias) => [...categorias, res])
    });
  }, [urlGetCategorias]);

  return { categorias };
}
