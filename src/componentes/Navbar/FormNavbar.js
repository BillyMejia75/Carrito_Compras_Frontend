import React, { useState, useCallback } from "react";

import { CgShoppingCart } from "react-icons/cg";
import { IoIosSearch } from "react-icons/io";
import { CBadge } from "@coreui/react";
import { NavLink, useNavigate } from "react-router-dom";

import { useCategorias } from "../../hooks/useCategorias";
import { useSelector } from "react-redux";
import debounce from "just-debounce-it";

function FormNavbar() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaId, setCategoriaId] = useState("");

  const { categorias } = useCategorias();
  const cantidadProductos = useSelector((state) => state.productos.length);
  const navigate = useNavigate();

  const setLocalStorage = (value) => {
    try {
      setBusqueda(value);
      window.localStorage.setItem("Busqueda", value);
      console.log("Si llego");
    } catch (error) {
      console.error(error);
    }
  };

  const helperNavigate = (cat, bus) => {
    if (cat) {
      //si hay busqueda o no
      if (bus) {
        navigate(`/buscar/${cat}/${bus}`);
      } else {
        navigate(`/buscar/${cat}/ `);
      }
    }
    //si hay busqueda pero no categoria
    else if (bus) {
      navigate(`/buscar/0/${bus}`);
    }
  };

  //El debounce hace una pausa para que el usuario termine de escribir
  const debounceGetProducts = useCallback(
    debounce((newSearch, categoriaId) => {
      if (categoriaId > 0) {
        //si hay categoria seleccionada
        if (newSearch !== "") {
          navigate(`/buscar/${categoriaId}/${newSearch}`);
        } else {
          navigate(`/buscar/${categoriaId}/ `);
        }
      } else {
        if (newSearch !== "") {
          navigate(`/buscar/0/${newSearch}`);
        } else {
          navigate(`/buscar/0/ `);
        }
      }
    }, 800),
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    helperNavigate(categoriaId, busqueda);
  };

  const handleChange = (event) => {
    const newSearch = event.target.value;
    setBusqueda(newSearch);
    debounceGetProducts(newSearch, categoriaId);
  };

  const handleChangeSelect = (event) => {
    const newSelected = event.target.value;
    setCategoriaId(newSelected);
    helperNavigate(newSelected, busqueda);
  };

  return (
    <div className="formulario">
      <form action="" className="form-search" onSubmit={handleSubmit}>
        <select
          name="categorias"
          className="select-categorias"
          value={categoriaId}
          onChange={handleChangeSelect}
        >
          <option value={0}>Todos</option>
          {categorias.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.categoria}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="search"
          className="input-search"
          onChange={handleChange}
          placeholder="Mouse, teclado, monitor..."
        />
        <button className="button-search">
          <IoIosSearch className="icon-search" />
        </button>
      </form>

      <NavLink className="position-relative" to="/Carrito" end>
        <CgShoppingCart className="icon-cart" />
        <CBadge
          position="top-end"
          shape="rounded-pill"
          className="border border-light span-custom"
        >
          {cantidadProductos > 0 ? cantidadProductos : ""}
        </CBadge>
      </NavLink>
    </div>
  );
}

export default FormNavbar;
