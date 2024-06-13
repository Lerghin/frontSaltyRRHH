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
import './ResponsiveSideBar.css'; // Import styles
import { useDispatch } from "react-redux";
import { logoutUser } from "../Store/Actions/authActions";

const ResponsiveSideBar = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminate any extra spaces
    }
    setLoading(false); // Mark loading as completed
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
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
            <NavLink to="/homeUser" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
              <CDBSidebarMenuItem icon="home" className="menu-item">Inicio</CDBSidebarMenuItem>
            </NavLink>
          
            <NavLink to="/createVacant" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
              <CDBSidebarMenuItem icon="sticky-note" className="menu-item">Crear Vacante</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/createUser" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
              {userRole === "USER" ? null : (
                <CDBSidebarMenuItem icon="user" className="menu-item">Crear Acceso Usuario</CDBSidebarMenuItem>
              )}
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "activeClicked" : "")}>
              {userRole === "USER" ? null : (
                <CDBSidebarMenuItem icon="user" className="menu-item">Crear Acceso Administrador</CDBSidebarMenuItem>
              )}
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
