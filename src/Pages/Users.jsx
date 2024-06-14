
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table"; // Asegúrate de importar la tabla
import "../Pages/Css/home.css";


import { API } from "../Utils/axios.js";
import { LS } from "../Utils/LS.js";
import TablaUsers from "../Componentes/TablaUsers.jsx";

import ResponsiveSideBar from "../Componentes/SideBarVacantes.jsx";
import SideBarUsers from "../Componentes/SideBarUsers.jsx";



const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sortedDoctors, setSortedDoctors] = useState([]);

  const [userRole, setUserRole] = useState(null);
  
 

  useEffect(() => {
    API
      .get("/users/traer")
      .then((response) => {
        const fetchUsers = response.data;
        
        setUsers(fetchUsers); 
        setResults(fetchUsers); // Store original data in 'doctors'
        setSortedDoctors(fetchUsers.sort((a, b) => a.nombre.localeCompare(b.nombre))); 
      })
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  const searcher = (e) => {
    const searchTerm= e.target.value.toLowerCase();
    setSearch(searchTerm);
  
    const filteredPatients= users.filter(pat=> 
    pat.firstName.toLowerCase().includes(searchTerm)||
    pat.lastName.toLowerCase().includes(searchTerm)|| pat.username.toLowerCase().includes(searchTerm)||
    pat.cedula.toString().includes(searchTerm)
  

    );
    setResults(searchTerm.trim === ""? users: filteredPatients)
  };

  
  const handleDelete = (id) => {
    setResults(prevResults => prevResults.filter(user => user.id !== id));
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };
  return (
    <div className="home">
      <div>
      <SideBarUsers className="home-sidebar" />
      </div>

      <div className="patientsTable">
      <div>
        <input style={{textAlign:"center"}} value={search} onChange={searcher} type="text" placeholder='Buscar Usuario' className='form-control' />
      </div>
      <div className="flex-container responsive-table">
        <Table striped bordered hover>
          <thead>
            <tr>
             
              <th>Nombre y Apellido</th>
              <th>Cedula</th>
              <th>UserName</th>
              <th>Role</th>
              
             
          
             
            
              {userRole === 'USER' ? null : ( <th></th>)}
            
              
            
           
              
              
            </tr>
          </thead>
          <tbody>
            {results.map((user) => (
              <TablaUsers key={user.id} data={user}  onDelete={handleDelete} />
            ))}
          </tbody>
        </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;