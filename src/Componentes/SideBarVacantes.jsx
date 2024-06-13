import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { LS } from "../Utils/LS";
import './ResponsiveSideBar.css'; // Asegúrate de importar los estilos
import { useDispatch } from "react-redux";
import { logoutUser } from "../Store/Actions/authActions";

const ResponsiveSideBar = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch= useDispatch()

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
    setLoading(false); // Marcar la carga como completada
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return <div>Loading...</div>; // O un spinner de carga
  }

  return (
    <div className="sidebar-custom">
      <CDBSidebar textColor="#fff" backgroundColor="#c51162">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/homeUser" className="text-decoration-none" style={{ color: "inherit" }}>
            Menu
          </a>
        </CDBSidebarHeader>


        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/homeUser" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home" className="menu-item">Inicio</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/createVacant" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
              <CDBSidebarMenuItem icon="sticky-note" className="menu-item">Crear Vacante</CDBSidebarMenuItem>
            </NavLink>
          
           
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <button className="logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
          <div style={{ padding: "20px 5px" }}>©Saltysnack Tuyero C.A.</div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default ResponsiveSideBar;
