import { useRef } from "react";

import { CContainer, CRow, CCol } from "@coreui/react";
import "../scss/home.scss";

import { BsArrowRight } from "react-icons/bs";

import { ReactComponent as Intro } from "../img/img_intro.svg";
import { Productos } from "../componentes/Productos";
import { useProductos } from "../hooks/useProductos";

const Home = () => {
  const productosRef = useRef(null);
  const { productos } = useProductos();

  const scrollSmoothHandler = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <CContainer>
      <CRow className="justify-content-center row-inicio">
        <CCol className="align-self-center">
          <div className="img-intro">
            <Intro className="img_intro" />
          </div>
        </CCol>
        <CCol className="align-self-center">
          <div className="intro">
            <p>
              Crea el <b>set up</b> de tus sueños con nuestra amplia selección
              de componentes para que puedas tener tu <b>pc gaming</b> a tu
              gusto.
            </p>
            <button
              className="comenzar"
              onClick={() => scrollSmoothHandler(productosRef)}
            >
              Comenzar <BsArrowRight className="arrow" />
            </button>
          </div>
        </CCol>
      </CRow>
      <CRow ref={productosRef}>
        <Productos productos={productos} />
      </CRow>
    </CContainer>
  );
};

export default Home;
