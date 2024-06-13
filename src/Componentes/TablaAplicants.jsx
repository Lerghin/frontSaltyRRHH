import {  Link} from "react-router-dom";
import "../Pages/Css/home.css";

import { useEffect, useState } from "react";
import { LS } from "../Utils/LS";




const TablaAplicants = ({ data }) => {
  const {
    idApplicant,
    firstName,
    lastName, 
    cedula,
    sexo,
  edad,
   state,
   municipality
 
  } = data;
  
  const [userRole, setUserRole] = useState(null);
 
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
 
  }, []);

  


 

  

  return (    
    <tr>
        <td className="namePatient">  <Link to={`/watchApp/${idApplicant}`}>{firstName} {lastName} </Link></td>
      <td>
        {cedula}
      </td>
    
      <td>{  edad}</td>
      <td>{sexo}</td>
      <td>{   state}</td>
      <td>{   municipality}</td>
   
  
    </tr>
  );
};

export default TablaAplicants;