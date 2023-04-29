import { useState, useEffect } from "react";

export function useConteo({ state }) {
  const [totalPagar, setTotalPagar] = useState();
  const [totalProductos, setTotalProductos] = useState();

  //Cuenta las cantidades de cada producto
  const conteoProductos = () => {
    let totalProductos = 0;
    for (let tot in state) {
      totalProductos += state[tot].cantidad;
    }
    setTotalProductos(totalProductos);
  };

  //La suma de los totales
  const conteoTotal = () => {
    let totalPagar = 0;
    for (let tot in state) {
      totalPagar += state[tot].total;
    }
    setTotalPagar(parseFloat(totalPagar.toFixed(2)));
  };

  useEffect(() => {
    conteoProductos();
    conteoTotal();
  }, [state]);

  return { totalPagar, totalProductos };
}
