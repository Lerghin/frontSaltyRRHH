import { useState } from "react";
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

const RegisterUser = () => {
  const params = useParams();
  const userId = `${params.id}`;
  const navigate = useNavigate();
  //const [error, setError] = useState(null);
  //const [loading, setLoading] = useState(true);
  const [applicant, setApplicant] = useState({
    user: {
      id: userId,
      role: "USER",
    },
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
    
    studiesList: [
      {
        institutionName: "",
        degree: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    jobsList: [
      {
        jobName: "",
        address: "",
        phone: "",
        position: "",
        peopleSubordinated: "",
        positionBoss: "",
        description: "",
        startDate: "",
        endDate: "",
        reason: "",
        nombreDeProfesion: "",
      },
    ],
    coursesList: [
      {
        nameCourse: "",
        nameInstitution: "",
        date: "",
      },
    ],
  });

  /* useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await API.get(`/user/${params.id}`);
        // Ensure that the data has the correct structure
        const fetchedApplicant = userResponse.data;
        fetchedApplicant.studiesList = fetchedApplicant.studiesList || [
          {
            userId: `${params.id}`,
            institutionName: "",
            degree: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ];
        fetchedApplicant.jobsList = fetchedApplicant.jobsList || [
          {
            companyName: "",
            role: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ];
        fetchedApplicant.coursesList = fetchedApplicant.coursesList || [
          {
            courseName: "",
            institution: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ];
        setApplicant(fetchedApplicant);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id]);*/

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplicant((prevApplicant) => ({
      ...prevApplicant,
      [name]: value,
    }));
  };

  const handleChangeList = (listName, index, e) => {
    const { name, value } = e.target;
    if (listName === "position") {
      setApplicant((prevApplicant) => ({
        ...prevApplicant,
        position: {
          ...prevApplicant.position,
          [name]: value,
        },
      }));
    } else {
      setApplicant((prevApplicant) => {
        const updatedList = [
          ...(Array.isArray(prevApplicant[listName])
            ? prevApplicant[listName]
            : []),
        ];
        updatedList[index][name] = value;
        return { ...prevApplicant, [listName]: updatedList };
      });
    }
  };

  const handleAddItem = (listName) => {
    if (listName === "position") {
      // No agregamos un nuevo objeto `position`, ya que solo debería haber uno
      console.log("You can't add more positions.");
    } else {
      setApplicant((prevApplicant) => ({
        ...prevApplicant,
        [listName]: [
          ...(Array.isArray(prevApplicant[listName])
            ? prevApplicant[listName]
            : []),
          {
            institutionName: "",
            degree: "",
            startDate: "",
            endDate: "",
            description: "",
          },
        ],
      }));
    }
  };

  const handleRemoveItem = (listName, index) => {
    setApplicant((prevApplicant) => {
      const updatedList = [
        ...(Array.isArray(prevApplicant[listName])
          ? prevApplicant[listName]
          : []),
      ];
      updatedList.splice(index, 1);
      return { ...prevApplicant, [listName]: updatedList };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isConfirmed = confirm(
      "Confirma que todos sus datos son correctos y que pueden ser verificables?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      await API.post("/app/create", applicant);
      alert("Usuario registrado con éxito");
      toast.success("Usuario registrado con éxito");
      navigate("/home");
    } catch (error) {
      alert(error.response.data);
    }
  };

  /* if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }*/

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
        Registrar Usuario
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

          {/* Botón de Enviar */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Registrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterUser;
