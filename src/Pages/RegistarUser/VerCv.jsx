import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import { API } from "../../Utils/axios";

import { IoAddCircleSharp } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";
import { RiArrowGoBackFill } from 'react-icons/ri';
import "react-toastify/dist/ReactToastify.css";
import { nationalities } from "../../Utils/nationalities";

const VerCv = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applicant, setApplicant] = useState({
    idApplicant: params.idApplicant,
    firstName: "",
    secondName: "",
    lastName: "",
    lastName2: "",
    nationality: "",
    dniType: "",
    cedula: "",
    sexo: "",
    birthDate: "",
    email: "",
    cellphone1: "",
    cellphone2: "",
    country: "",
    address: "",
    state: "",
    parish: "",
    municipality: "",
    salary: "",
    disponibility: "",
    studiesList: [],
    jobsList: [],
    coursesList: [],
    nombreDeProfesion: "",
   
    
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const applicantResponse = await API.get(`/applicants/traer/${params.idApplicant}`);
        
        let studiesList = [];
        let jobsList = [];
        let coursesList = [];
  
        try {
          const studiesResponse = await API.get(`/applicants/studies/${params.idApplicant}`);
          studiesList = studiesResponse.data;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            studiesList = []; // No hay estudios para este solicitante
          } else {
            throw error; // Otros errores deben ser manejados globalmente
          }
        }
  
        try {
          const jobsResponse = await API.get(`/applicants/jobs/${params.idApplicant}`);
          jobsList = jobsResponse.data;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            jobsList = []; // No hay trabajos para este solicitante
          } else {
            throw error; // Otros errores deben ser manejados globalmente
          }
        }
  
        try {
          const coursesResponse = await API.get(`/applicants/courses/${params.idApplicant}`);
          coursesList = coursesResponse.data;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            coursesList = []; // No hay cursos para este solicitante
          } else {
            throw error; // Otros errores deben ser manejados globalmente
          }
        }
  
        setApplicant({
          ...applicantResponse.data,
          studiesList,
          jobsList,
          coursesList,
        });
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("El solicitante no se encuentra. Puede que haya sido eliminado.");
        } else {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [params.idApplicant]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prevApplicant) => ({
      ...prevApplicant,
      [name]: value,
    }));
  };

  const handleChangeList = (listName, index, e) => {
    const { name, value } = e.target;
    setApplicant((prevApplicant) => {
      const updatedList = [...prevApplicant[listName]];
      updatedList[index][name] = value;
      return { ...prevApplicant, [listName]: updatedList };
    });
  };

  const handleAddItem = (listName) => {
    setApplicant((prevApplicant) => ({
      ...prevApplicant,
      [listName]: [
        ...prevApplicant[listName],
        {
          institutionName: "",
          degree: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const handleRemoveItem = (listName, index) => {
    setApplicant((prevApplicant) => {
      const updatedList = [...prevApplicant[listName]];
      updatedList.splice(index, 1);
      return { ...prevApplicant, [listName]: updatedList };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = window.confirm(
      "Confirma que todos sus datos son correctos y que pueden ser verificables?"
    );

    if (!isConfirmed) {
      return;
    }

    try {
      await API.put(`/app/editar/ ${params.idApplicant}`, applicant);
     alert("Usuario actualizado con éxito");
      navigate("/homeUser");
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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Editar CV
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Datos Personales */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Primer Nombre"
              name="firstName"
              value={applicant.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Segundo Nombre"
              name="secondName"
              value={applicant.secondName}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido Paterno"
              name="lastName"
              value={applicant.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido Materno"
              name="lastName2"
              value={applicant.lastName2}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Nacionalidad"
              variant="outlined"
              fullWidth
              margin="normal"
              name="dniType"
              value={applicant.dniType}
              onChange={handleChange}
              required
            >
              {nationalities.map((nationality) => (
                <MenuItem key={nationality.code} value={nationality.code}>
                  {nationality.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Tipo de Documento"
              variant="outlined"
              fullWidth
              margin="normal"
              select
              name="nationality"
              value={applicant.nationality}
              onChange={handleChange}
              required
            >
              <MenuItem value="VENEZOLANO">VENEZOLANO</MenuItem>
              <MenuItem value="EXTRANJERO">EXTRANJERO</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Cédula"
              name="cedula"
              value={applicant.cedula}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Sexo"
              variant="outlined"
              fullWidth
              margin="normal"
              select
              name="sexo"
              value={applicant.sexo}
              onChange={handleChange}
              required
            >
              <MenuItem value="MASCULINO">Masculino</MenuItem>
              <MenuItem value="FEMENINO">Femenino</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Nacimiento"
              name="birthDate"
              type="date"
              value={applicant.birthDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo Electrónico"
              name="email"
              value={applicant.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Celular 1"
              name="cellphone1"
              value={applicant.cellphone1}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Celular 2"
              name="cellphone2"
              value={applicant.cellphone2}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="País"
              name="country"
              value={applicant.country}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dirección"
              name="address"
              value={applicant.address}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Estado"
              name="state"
              value={applicant.state}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Parroquia"
              name="parish"
              value={applicant.parish}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Municipio"
              name="municipality"
              value={applicant.municipality}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Salario Deseado"
              name="salary"
              value={applicant.salary}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Disponibilidad"
              name="disponibility"
              value={applicant.disponibility}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Profesión"
              name="nombreDeProfesion"
              type="text"
              placeholder="Ejemplo: Administrador, Contador, Diseñador Gráfico, Ayudante, Pasante"
              value={applicant.nombreDeProfesion}
              onChange={handleChange} 
              fullWidth
              required
            />
          </Grid>
         
        </Grid>

        {/* Estudios */}
        <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Estudios
            </Typography>
            {applicant.studiesList.length === 0 ? (
            <Typography>No hay estudios registrados.</Typography>
          ) : (
              applicant.studiesList.map((study, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nombre de la Institución"
                      name="institutionName"
                      value={study.institutionName || ""}
                      onChange={(e) =>
                        handleChangeList("studiesList", index, e)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Título"
                      name="degree"
                      value={study.degree || ""}
                      onChange={(e) =>
                        handleChangeList("studiesList", index, e)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha de Inicio"
                      name="startDate"
                      type="date"
                      value={study.startDate || ""}
                      onChange={(e) =>
                        handleChangeList("studiesList", index, e)
                      }
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha de Fin"
                      name="endDate"
                      type="date"
                      value={study.endDate || ""}
                      onChange={(e) =>
                        handleChangeList("studiesList", index, e)
                      }
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Breve Descripción"
                      name="description"
                      value={study.description || ""}
                      onChange={(e) =>
                        handleChangeList("studiesList", index, e)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton
                      onClick={() => handleRemoveItem("studiesList", index)}
                    >
                      <CiCircleRemove />
                    </IconButton>
                  </Grid>
                </Grid>
               ) ))}
              </Grid>
        <IconButton onClick={() => handleAddItem("studiesList")} aria-label="Agregar">
          <IoAddCircleSharp />
        </IconButton>


      {/* Trabajos */}
      <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Trabajos
            </Typography>
            {applicant.jobsList.length === 0 ? (
            <Typography>No hay trabajos registrados.</Typography>
          ) : (
              applicant.jobsList.map((job, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nombre de la Empresa"
                      name="jobName"
                      value={job.jobName || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Dirección"
                      name="address"
                      value={job.address || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Telefono"
                      name="phone"
                      value={job.phone || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cargo"
                      name="position"
                      value={job.position || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Personas a su cargo"
                      name="peopleSubordinated"
                      value={job.peopleSubordinated || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Cargo de su jefe inmediato"
                      name="positionBoss"
                      value={job.positionBoss || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Breve descripcion del cargo"
                      name="description"
                      value={job.description || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha de Inicio"
                      name="startDate"
                      type="date"
                      value={job.startDate || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha de Fin"
                      name="endDate"
                      type="date"
                      value={job.endDate || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Motivo de Egreso"
                      name="reason"
                      value={job.reason || ""}
                      onChange={(e) => handleChangeList("jobsList", index, e)}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton
                      onClick={() => handleRemoveItem("jobsList", index)}
                    >
                      <CiCircleRemove />
                    </IconButton>
                  </Grid>
                </Grid>
               )))}
              </Grid>
        <IconButton onClick={() => handleAddItem("jobsList")} aria-label="Agregar">
          <IoAddCircleSharp />
        </IconButton>

      
          {/* Cursos */}
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Cursos
            </Typography>
            {applicant.coursesList.length === 0 ? (
            <Typography>No hay cursos registrados.</Typography>
          ) : (
              applicant.coursesList.map((course, index) => (
                <Grid container spacing={2} key={index}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Nombre del Curso"
                      name="nameCourse"
                      value={course.nameCourse || ""}
                      onChange={(e) =>
                        handleChangeList("coursesList", index, e)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Institución"
                      name="nameInstitution"
                      value={course.nameInstitution || ""}
                      onChange={(e) =>
                        handleChangeList("coursesList", index, e)
                      }
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Fecha"
                      name="date"
                      type="date"
                      value={course.date || ""}
                      onChange={(e) =>
                        handleChangeList("coursesList", index, e)
                      }
                      fullWidth
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <IconButton
                      onClick={() => handleRemoveItem("coursesList", index)}
                    >
                      <CiCircleRemove />
                    </IconButton>
                  </Grid>
                </Grid>
              ) ))}
           
          </Grid>
          <IconButton onClick={() => handleAddItem("coursesList")} aria-label="Agregar">
          <IoAddCircleSharp />
        </IconButton>
          
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Guardar Cambios
          </Button>
        </Grid>
      </form>
      <Button onClick={() => navigate("/homeUser")} startIcon={<RiArrowGoBackFill />}>
        Volver
      </Button>
    </Container>
  );
};

export default VerCv;
