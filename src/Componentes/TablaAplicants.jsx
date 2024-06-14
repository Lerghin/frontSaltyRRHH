import {  Link, useNavigate} from "react-router-dom";
import "../Pages/Css/home.css";
import "../Pages/Css/home.css";
import { FaUserEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { LS } from "../Utils/LS";
import { MdDeleteForever } from "react-icons/md";
import { API } from "../Utils/axios";





const TablaAplicants = ({ data, onDelete }) => {
  const {
    idApplicant,
    firstName,
    lastName, 
    cedula,
    sexo,
  edad,
   state,
   municipality,
   nombreDeProfesion
 
  } = data;
  
  const [userRole, setUserRole] = useState(null);
 const navigate= useNavigate()
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
 
  }, []);
  
  const handleDelete = async (idApplicant) => {
    if (window.confirm("¿Seguro que quieres borrar?")) {
      try {
        await API.delete(`/app/borrar/${idApplicant}`);
        onDelete(idApplicant); 
        navigate('/aplicantes')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  


 

  

  return (    
    <tr >
        <td className="namePatient  ">  <Link   to={`/watchApp/${idApplicant}`} className="link-unstyled" >{firstName} {lastName} </Link></td>
      <td>
        {cedula}
      </td>
    
      <td>{ edad}</td>
      <td>{sexo}</td>
      <td>{ state}</td>
      <td>{ municipality}</td>
      <td>{ nombreDeProfesion}</td>
      
     {userRole==='USER'? null :(<td  >
      <FaUserEdit className="m-2 my-2 h-5" onClick={() => navigate(`/editApp/${idApplicant}`)}  /> 
      
        <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(idApplicant) }/>
       
      </td>)}
   
  
    </tr>
  );
};

export default TablaAplicants;