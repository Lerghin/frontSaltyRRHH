import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { FiPrinter } from 'react-icons/fi';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { generatePDFApplicant } from './generatePDFApplicant'; 
import { API } from '../../Utils/axios';
import '../Css/home.css';

const UserDetails = () => {
  const navigate = useNavigate();
  const { idApplicant } = useParams();
  const [applicant, setApplicant] = useState(null);
  const [studiesList, setStudiesList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [applicantResponse, studiesResponse, jobsResponse, coursesResponse] = await Promise.all([
          API.get(`/applicants/traer/${idApplicant}`),
          API.get(`/applicants/studies/${idApplicant}`),
          API.get(`/applicants/jobs/${idApplicant}`),
          API.get(`/applicants/courses/${idApplicant}`)
        ]);

        setApplicant(applicantResponse.data);
        setStudiesList(studiesResponse.data || []);
       
        setJobsList(jobsResponse.data || []);
        console.log(coursesResponse.data)
        setCoursesList(coursesResponse.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idApplicant]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!applicant) {
    return <p>No se encontró información del candidato.</p>;
  }

  const handlePrint = () => {
    console.log('Imprimir PDF:', { applicant, studiesList, jobsList, coursesList });
    generatePDFApplicant(applicant, studiesList, jobsList, coursesList);
  };

  return (
    <div className="container p-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title font-bold">Detalles del Candidato:</h5>
          <p className="card-text"><b>Nombre Completo:</b> {applicant.firstName} {applicant.lastName}</p>
          <p className="card-text"><b>Cédula:</b> {applicant.cedula}</p>
          <p className="card-text"><b>Sexo:</b> {applicant.sexo}</p>
          <p className="card-text"><b>Edad:</b> {applicant.edad}</p>
          <p className="card-text"><b>Fecha de Nacimiento:</b> {applicant.birthDate}</p>
          <p className="card-text"><b>Dirección:</b> {applicant.address}</p>
          <p className="card-text"><b>Teléfono:</b> {applicant.cellphone1}</p>
          <p className="card-text"><b>Email:</b> {applicant.email}</p>
          <p className="card-text"><b>Nacionalidad:</b> {applicant.nationality}</p>
          <p className="card-text"><b>País:</b> {applicant.country}</p>
          <p className="card-text"><b>Profesión u Oficio:</b> {applicant.nombreDeProfesion}</p>
        </div>
      </div>

      {studiesList.length > 0 ? (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title text-center font-bold">Historial Académico</h5>
            <table className="table w-70 ">
              <thead >
                <tr>
                  <th>Institución</th>
                  <th>Título</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha de Fin</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody  >
                {studiesList.map((study) => (
                  <tr key={study.idStudy}>
                    <td>{study.institutionName}</td>
                    <td>{study.degree}</td>
                    <td>{study.startDate}</td>
                    <td>{study.endDate}</td>
                    <td>{study.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-3">No hay estudios disponibles para este candidato.</p>
      )}

      {jobsList.length > 0 ? (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title text-center font-bold">Experiencia Laboral</h5>
            <table className="table w-70">
              <thead >
                <tr>
                  <th>Empresa</th>
                  <th>Posición</th>
                  <th>Fecha de Inicio</th>
                  <th>Fecha de Fin</th>
                  <th>Descripción</th>
                </tr>
              </thead>
              <tbody >
                {jobsList.map((job) => (
                  <tr key={job.idJob}>
                    <td>{job.jobName}</td>
                    <td>{job.position}</td>
                    <td>{job.startDate}</td>
                    <td>{job.endDate}</td>
                    <td>{job.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-3">No hay trabajos disponibles para este candidato.</p>
      )}

      {coursesList.length > 0 ? (
        <div className="card mt-3">
          <div className="card-body">
            <h5 className="card-title text-center font-bold">Cursos Realizados</h5>
            <table className="table w-70">
              <thead>
                <tr>
                  <th>Curso</th>
                  <th>Institución</th>
                  <th>Fecha de Finalización</th>
                
                </tr>
              </thead>
              <tbody>
                {coursesList.map((course) => (
                  <tr key={course.idCourse}>
                    <td>{course.nameCourse}</td>
                    <td>{course.nameInstitution}</td>
                    <td>{course.date}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="mt-3">No hay cursos disponibles para este candidato.</p>
      )}

      <div id="buttons-container" className="d-flex justify-center gap-5 p-4 h-100vh">
        <Button onClick={handlePrint} variant="success"><FiPrinter />Imprimir</Button>
        <Button onClick={() => navigate('/vacantes')} variant="secondary"><RiArrowGoBackFill />Volver</Button>
      </div>
    </div>
  );
};

export default UserDetails;
