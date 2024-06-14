

import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../Css/home.css";

import { LS } from "../../Utils/LS";

import SideBarVacantes from "../../Componentes/SideBarVacantes";
import { API } from "../../Utils/axios";

import TablaAplicants from "../../Componentes/TablaAplicants";
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";
import {  Button } from 'react-bootstrap';



const Applicants = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [sortedPacientes, setSortedPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const navigate=useNavigate();
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }

  }, []);
  const handleDelete = (idApplicant) => {
    setResults((prevResults) =>
      prevResults.filter((paciente) => paciente.idApplicant !== idApplicant)
    );
    setPacientes((prevPacientes) =>
      prevPacientes.filter((paciente) => paciente.idApplicant !== idApplicant)
    );
  };


  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await API.get(`/applicant/get`);
        const fetchedPat = response.data;
        console.log(fetchedPat)
        setPacientes(fetchedPat);
        setResults(fetchedPat);
        setSortedPacientes(fetchedPat.sort((a, b) => a.firstName.localeCompare(b.firstName)));
      } catch (error) {
        console.error('Error fetching aplicants:', error); // Log de error
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPacientes();
  }, []);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!pacientes || !results) {
    return <p>No se encontró información del paciente.</p>;
  }

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredPatients = pacientes.filter(
      (pat) =>
        pat.firstName.toLowerCase().includes(searchTerm) ||
        pat.lastName.toLowerCase().includes(searchTerm) ||
        pat.state.toLowerCase().includes(searchTerm) ||
        pat.nombreDeProfesion.toLowerCase().includes(searchTerm) ||
        pat.cedula.toString().includes(searchTerm)
    );
    setResults(searchTerm.trim() === "" ? pacientes : filteredPatients);
  };



  return (
    <div className="home">
      <div>
        <SideBarVacantes className="home-sidebar" />
      </div>

      <div className="patientsTable">
        <div>
          <input
            style={{ textAlign: "center" }}
            value={search}
            onChange={searcher}
            type="text"
            placeholder="Buscar Aplicante"
            className="form-control"
          />
        </div>
        <div className="flex-container responsive-table">
          {results.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                <th>Nombre y Apellido </th>
                  <th>Cedula</th>
                  <th>Edad</th>
                  <th>Sexo</th>
                  <th>Estado</th>
                  <th>Municipio</th>
                  <th>Profesión u Oficio</th>

                  <th></th>
                
               
              
                </tr>
              </thead>
              <tbody>
                {results.map((paciente) => (
                  <TablaAplicants key={paciente.idApplicant} data={paciente}  onDelete={handleDelete}  />
                ))}
              </tbody>
            </Table>
          ) : (
            <div>
            <p className="text-center p-4"> <b>Aún no hay aplicantes para esta oferta laboral</b></p>
            <Button onClick={() => navigate('/vacantes')} variant="secondary">
              <RiArrowGoBackFill /> Atras
            </Button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Applicants;

