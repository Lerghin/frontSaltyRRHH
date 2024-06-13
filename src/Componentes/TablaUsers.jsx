import {  useNavigate } from "react-router-dom";
import "../Pages/Css/home.css";

import { MdDeleteForever } from "react-icons/md";

import { useEffect, useState } from "react";
import { LS } from "../Utils/LS";
import { API } from "../Utils/axios";


const TablaUsers = ({ data, onDelete }) => {
  const {
    id,
    firstName,
    lastName,
    username,
    cedula,
   role 
   
  } = data;
  

  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); 
    }
   console.log("error")
  }, []);
  
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres borrar el usuario?")) {
      try {
        await API.delete(`user/delete/${id}`);
        onDelete(id); 
        navigate('/users')
       
      } catch (error) {
        alert(error)
       
      }
    }
  };

  return (    
    <tr>
      <td className="namePatient">
        {firstName} {lastName}
      </td>
      <td>{cedula}</td>
      <td>{username}</td>
      <td>{role}</td>
     
     
     
    
      
    { userRole==='USER' ?null: (<td  >

      
        <MdDeleteForever className="m-2 "  onClick={()=>handleDelete(id) }/>
  
      </td>)}
    </tr>
  );
};

export default TablaUsers;