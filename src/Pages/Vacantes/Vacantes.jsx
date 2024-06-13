import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../Css/home.css";
import "react-datepicker/dist/react-datepicker.css";
import { LS } from "../../Utils/LS";
import TablaVacantes from "../../Componentes/TablaVacantes";
import SideBarVacantes from "../../Componentes/SideBarVacantes";
import { API } from "../../Utils/axios";
import DatePicker from "react-datepicker";
import {  Button } from 'react-bootstrap';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";

const Vacantes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate=useNavigate();

  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); // Eliminar espacios extra si los hay
    }
  }, []);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await API.get("/vacant/get");
        const fetchedPat = response.data;

        // Ordenar las vacantes por fecha de manera descendente
        const sortedPacientes = fetchedPat.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha);
        });

        setPacientes(sortedPacientes);
        setResults(sortedPacientes);
      } catch (error) {
        console.error("Error fetching vacantes:", error); // Log de error
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
    return <p>No se encontró información de las vacantes.</p>;
  }

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredPatients = pacientes.filter(
      (pat) =>
        pat.nombreVacante.toLowerCase().includes(searchTerm) ||
        pat.status.toLowerCase().includes(searchTerm)
    );
    setResults(searchTerm.trim() === "" ? pacientes : filteredPatients);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    if (date) {
      const formattedDate = date.toISOString().split("T")[0];

      const filteredCitas = pacientes.filter((pat) => {
        return pat.fecha.includes(formattedDate);
      });

      setResults(filteredCitas);
    } else {
      setResults(pacientes);
    }
  };

  const handleDelete = (id) => {
    setResults((prevResults) =>
      prevResults.filter((paciente) => paciente.id !== id)
    );
    setPacientes((prevPacientes) =>
      prevPacientes.filter((paciente) => paciente.id !== id)
    );
  };

  return (
    <div className="home">
      <div>
        <SideBarVacantes className="home-sidebar" />
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
          <div className="date-picker-container">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="form-control text-center "
              placeholderText="Buscar por Fecha"
            />
          </div>
        </div>

        <div className="flex-container responsive-table">
          {results.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Nombre De la Vacante</th>
                  <th>Cantidad Disponible</th>
                  <th>Cantidad Cubierta</th>
                  <th>Estatus de la Vacante</th>
                  <th>Solicitantes</th>
                  {userRole === "USER" ? null : <th></th>}
                </tr>
              </thead>
              <tbody>
                {results.map((paciente) => (
                  <TablaVacantes
                    key={paciente.id}
                    data={paciente}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </Table>
          ) : (
           
            <div className="d-flex justify-center gap-5 p-4 h-100vh  ">
               <p>No se encontraron vacantes.</p>
           
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

export default Vacantes;
