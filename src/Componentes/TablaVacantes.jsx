import {  useNavigate } from "react-router-dom";
import "../Pages/Css/home.css";
import { FaUserEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import { useEffect, useState } from "react";
import { LS } from "../Utils/LS";
import { API } from "../Utils/axios";



const TablaVacante = ({ data, onDelete }) => {
  const {
    id,
    nombreVacante, 
    fecha,
    cantidadCubierta,
   cantidadDisponible,
   status,
  
 
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
    
      <td>{  cantidadDisponible}</td>
      <td>{cantidadCubierta}</td>
      <td>{  status}</td>
     
      <td className="applicant"> <MdPeople  onClick={() => navigate(`/appVacants/${id}`)}  /></td>
     {userRole==='USER'? null :(<td  >
      <FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editVacant/${id}`)}  /> 
      
        <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(id) }/>
       
      </td>)}
    </tr>
  );
};

export default TablaVacante;