// Ajustes en VacancyUser.js
import  { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import VacancyCard from '../../Componentes/VacancyCard';
import { API } from '../../Utils/axios';
import { useNavigate } from 'react-router-dom';
import { LS } from '../../Utils/LS';
import SideBarUsers from '../../Componentes/SideBarUsers';
import './VacancyUser.css'; // Asegúrate de que el archivo CSS esté en el mismo directorio

const VacancyUser = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [userID, setUserId] = useState(null);
  const [idApplicant, setIdApplicant] = useState(null);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const idUser = await LS.getText('userId');
        if (idUser) {
          setUserId(idUser.trim().toString());
          const userResponse = await API.get(`/users/${idUser}`);
          setIdApplicant(userResponse.data.idApplicant);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      }
    };

    fetchUserData();
  }, [idApplicant]);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);

    const filteredPatients = vacancies.filter(
      (pat) =>
        pat.nombreVacante.toLowerCase().includes(searchTerm) ||
        pat.status.toLowerCase().includes(searchTerm)
    );
    setResults(searchTerm.trim() === "" ? vacancies : filteredPatients);
  };

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        const response = await API.get("/vacant/get");
        const fetchedVacancies = response.data;

        const sortedVacancies = fetchedVacancies.sort((a, b) => {
          return new Date(b.fecha) - new Date(a.fecha);
        });

        setVacancies(sortedVacancies);
        setResults(sortedVacancies);
      } catch (error) {
        console.error("Error fetching vacantes:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, []);

  const GoBack = () => {
    navigate('/homeUser');
  };

  const handleApply = async (vacancyId, idApplicant) => {
    try {
      const response = await API.post(`${idApplicant}/apply/${vacancyId}`);
      alert("Te has postulado Exitosamente");
      GoBack();
      console.log("Application successful:", response.data);
    } catch (error) {
      alert(error.response.data);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!vacancies.length) {
    return <p>No se encontró información de las vacantes.</p>;
  }

  return (
    <div className="vacancy-user-page">
      <SideBarUsers className="home-sidebar" />
      <div className="vacancy-content">
        <Container>
          <div className="m-2">
            <br />
            <input
              style={{ textAlign: "center" }}
              value={search}
              onChange={searcher}
              type="text"
              placeholder="Escoge Tú Vacante"
              className="form-control"
            />
            <br />
            <div className='text-center'>
              <Button onClick={GoBack} variant="secondary">Volver a Home</Button>
            </div>
          </div>
          <br />
          <h1 className='text-center'>Vacantes Disponibles</h1>
          <Row xs={1} md={2} lg={3} className="g-4">
            {results.map((vacancy) => (
              <Col key={vacancy.id}>
                <VacancyCard vacancy={vacancy} onApply={() => handleApply(vacancy.id, idApplicant)} />
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default VacancyUser;
