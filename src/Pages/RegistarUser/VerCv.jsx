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
import { toast } from "react-toastify";
import { IoAddCircleSharp } from "react-icons/io5";
import { CiCircleRemove } from "react-icons/ci";

import "react-toastify/dist/ReactToastify.css";
import { nationalities } from "../../Utils/nationalities";

import { RiArrowGoBackFill } from 'react-icons/ri';


const verCv = () => {
  const params = useParams();
  const idApplicant= params.idApplicant;
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  const [applicant, setApplicant] = useState({
    idApplicant:idApplicant,
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
    user: {
      id:"",

     
    }
  });
  
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [
          applicantResponse,
          studiesResponse,
          jobsResponse,
          coursesResponse
        ] = await Promise.all([
          API.get(`/applicants/traer/${params.idApplicant}`),
          API.get(`/applicants/studies/${params.idApplicant}`),
          API.get(`/applicants/jobs/${params.idApplicant}`),
          API.get(`/applicants/courses/${params.idApplicant}`),

        ]);

        setApplicant({
          ...applicantResponse.data,
          studiesList: studiesResponse.data || [],
          jobsList: jobsResponse.data || [],
          coursesList: coursesResponse.data || [],
 
        });
        
      } catch (error) {
        setError(error.message);
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
      console.log(applicant)
      await API.put('app/editar', applicant);

      toast.success("Usuario actualizado con éxito");
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
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={applicant.email}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono 1"
              name="cellphone1"
              value={applicant.cellphone1}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Teléfono 2"
              name="cellphone2"
              value={applicant.cellphone2}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
              label="Parroquia"
              name="parish"
              value={applicant.parish}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          {/* Estudios */}
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Estudios
            </Typography>
            {applicant.studiesList &&
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
              ))}
            <Button
              variant="outlined"
              onClick={() => handleAddItem("studiesList")}
              startIcon={<IoAddCircleSharp />}
            >
              Añadir Estudio
            </Button>
          </Grid>

          {/* Trabajos */}
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Trabajos
            </Typography>
            {applicant.jobsList &&
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
              ))}
            <Button
              variant="outlined"
              onClick={() => handleAddItem("jobsList")}
              startIcon={<IoAddCircleSharp />}
            >
              Añadir Trabajo
            </Button>
          </Grid>

          {/* Cursos */}
          <Grid item xs={12}>
            <Typography variant="h5" component="h2" gutterBottom>
              Cursos
            </Typography>
            {applicant.coursesList &&
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
              ))}
            <Button
              variant="outlined"
              onClick={() => handleAddItem("coursesList")}
              startIcon={<IoAddCircleSharp />}
            >
              Añadir Curso
            </Button>
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

          <Grid item xs={12}>
            <TextField
              label="Sueldo al que aspira"
              name="salary"
              type="number"
              value={applicant.salary}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Disponibilidad"
              name="disponibility"
              value={applicant.disponibility}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
              <div  className="hidden" value={applicant.user.id}
              onChange={handleChange}></div>
          {/* Botón de Enviar */}
          <Grid item xs={12}>
       
 
        <Button onClick={() => navigate('/homeUser')} variant="secondary"><RiArrowGoBackFill />Volver</Button>
        <Button type="submit" variant="contained" color="primary">
              Editar
            </Button>
     
            
            <br /><br />
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default verCv;