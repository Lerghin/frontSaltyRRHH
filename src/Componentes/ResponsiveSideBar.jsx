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
      <CDBSidebar textColor="#fff" backgroundColor="#E91E63">
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
            <NavLink exact to="/citaDay" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt" className="menu-item">Citas del DíA</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createCita" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="calendar" className="menu-item">Registrar Citas</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createHistory" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt" className="menu-item">Registrar Historia</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createPatients" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt" className="menu-item">Registrar Pacientes</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createHorario" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt" className="menu-item">Crear Horarios</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createPresu" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="file-alt" className="menu-item">Crear Presupuesto</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/createUser" activeClassName="activeClicked">
              {userRole === "USER" ? null : (
                <CDBSidebarMenuItem icon="user" className="menu-item">Crear Acceso Doctor</CDBSidebarMenuItem>
              )}
            </NavLink>
            <NavLink exact to="/signup" activeClassName="activeClicked">
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
