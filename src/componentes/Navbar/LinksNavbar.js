import { NavLink } from "react-router-dom";

const logo = require("../../img/Logotipo.png");

function LinksNavbar() {
  return (
    <div className="logo-links">
      <img src={logo} alt="" className="logo" />
      <ul>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive && "active"}`}
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/asdc"
            end
            className={({ isActive }) => `nav-link ${isActive && "active"}`}
          >
            Ofertas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/asd"
            end
            className={({ isActive }) => `nav-link ${isActive && "active"}`}
          >
            Algo mas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/asdasd"
            end
            className={({ isActive }) => `nav-link ${isActive && "active"}`}
          >
            Algo mas
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default LinksNavbar;
