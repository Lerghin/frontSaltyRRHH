import {  useNavigate } from "react-router-dom";
import "../Pages/Css/home.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { useEffect, useState } from "react";
import { LS } from "../Utils/LS";
import { API } from "../Utils/axios";



const TablaMyApp= ({ data }) => {
  const {
    id,
    nombreVacante, 
    fecha,
   
   status,
   descripcion
  
 
  } = data;
  
  const [userRole, setUserRole] = useState(null);
 
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
 
  }, []);

  
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres borrar la Vacante?")) {
      try {
        await API.delete(`/vacant/delete/${id}`);
        onDelete(id); 
        navigate('/vacantes')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  

  return (    
    <tr>
        <td>{fecha}</td>
      <td>
        {nombreVacante}
      </td>
    
      <td>{  status}</td>
      <td>{descripcion}</td>
   
   
    </tr>
  );
};

export default TablaMyApp;