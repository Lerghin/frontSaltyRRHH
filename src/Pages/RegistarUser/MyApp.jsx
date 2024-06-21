import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";

import "react-datepicker/dist/react-datepicker.css";
import { LS } from "../../Utils/LS";


import { API } from "../../Utils/axios";

import {  Button } from 'react-bootstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import TablaMyApp from "../../Componentes/TablaMyApp";
import SideBarUsers from "../../Componentes/SideBarUsers";

const MyApp = () => {
  const [vacantes, setVacantes] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  const [userID, setUserId] = useState(null);

  const [idApplicant, setIdApplicant] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
   
        const idUser = await LS.getText('userId');

       
        if (idUser) {
          setUserId(idUser.trim().toString());
          
          const userResponse = await API.get(`/users/${idUser}`);
         
          setIdApplicant(userResponse.data.idApplicant)
        
          
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [idApplicant]);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await API.get(`/applicant/vacant/${idApplicant}`);
 
        const fetchedPat = response.data;
      

        // Ordenar las vacantes por fecha de manera descendente
        const sortedVacancies = fetchedPat.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha);
        });

        setVacantes(sortedVacancies);
        setResults(sortedVacancies);
      } catch (error) {
        console.error("Error fetching vacantes:", error); // Log de error
     
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, [idApplicant]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!vacantes || !results) {
    return <p>No se encontró información de las vacantes.</p>;
  }

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredPatients = vacantes.filter(
      (pat) =>
        pat.nombreVacante.toLowerCase().includes(searchTerm) ||
        pat.status.toLowerCase().includes(searchTerm)
    );
    setResults(searchTerm.trim() === "" ? vacantes : filteredPatients);
  };



  return (
    <div className="home ">
      <div>
      <SideBarUsers className="home-sidebar" />
      </div>

      <div className="patientsTable">
        <div className="d-flex gap-4 w-100">
          <input
            style={{ textAlign: "center" }}
            value={search}
            onChange={searcher}
            type="text"
            placeholder="Buscar Vacante"
            className="form-control"
          />
          <br />
        
        </div>

        <div className="flex-container responsive-table">
          {results.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr >
                  <th  >Fecha</th>
                  <th>Nombre De la Vacante</th>
                  <th>status</th>
                  <th>descripcion</th>
               
                  
         
                </tr>
              </thead>
              <tbody>
                {results.map((vacante) => (
                  <TablaMyApp
                    key={vacante.id}
                    data={vacante}
                   
                  />
                ))}
              </tbody>
            </Table>
          ) : (
           
            <div className="d-flex justify-center gap-5 p-4 h-100vh  ">
               <p>No se encontraron vacantes.</p>
           
            <Button onClick={() => navigate('/homeUser')} variant="secondary">
              <RiArrowGoBackFill /> Atras
            </Button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyApp;
