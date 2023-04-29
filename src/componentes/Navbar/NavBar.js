import "../../scss/navbar.scss";
import { useScrolled } from "../../hooks/useScrolled";
import FormNavbar from "./FormNavbar";
import LinksNavbar from "./LinksNavbar";

const NavBar = () => {
  const { isScrolled } = useScrolled();

  return (
    <div
      className={
        isScrolled ? "navbar-custom navbar-custom-scrolled" : "navbar-custom"
      }
    >
      <LinksNavbar />
      <FormNavbar />

      <div className="login">
        <button className="registrarse">Registrarse</button>
        <button className="iniciar_sesion">Iniciar Sesión</button>
      </div>
    </div>
  );
};

export default NavBar;
