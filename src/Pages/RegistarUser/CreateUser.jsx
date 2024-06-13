import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";

import { useNavigate } from "react-router-dom";
import { API } from "../../Utils/axios";
import { RiArrowGoBackFill } from 'react-icons/ri';






const Root = styled("div")({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f5f5f5",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 400,
  width: "100%",
  backgroundColor: "#fff",
}));

const Title = styled(Typography)({
  marginBottom: "16px",
  color: "#000",
  textAlign: "center",
});

const StyledButton = styled(Button)({
  backgroundColor: "#f50057",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#c51162",
  },
});



const CreateUser = () => {
 
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    cedula: "",
    password: "",
    nationality: "",
  });

  const handleChange= (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
}
 const navigate= useNavigate()

 const handleSignup = async () => {
 
  
    console.log(formData)
    try {
     await API.post("auth/register/user", formData);
     
        alert('Usuario registrado Satisfactoriamente');
       navigate('/users')
      
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <Root>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <StyledPaper elevation={3}>
              <Title variant="h5">Registrar Usuario</Title>

              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                margin="normal"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Apellido"
                variant="outlined"
                fullWidth
                margin="normal"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              <TextField
                label="Tipo de Documento"
                variant="outlined"
                fullWidth
                margin="normal"
                select
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                required
              >
                <MenuItem value="VENEZOLANO">VENEZOLANA</MenuItem>
                <MenuItem value="EXTRANJERO">EXTRANJERO</MenuItem>
              </TextField>
              <TextField
                label="Cédula"
                variant="outlined"
                fullWidth
                margin="normal"
                name="cedula"
                type="number"
                value={formData.cedula}
                onChange={handleChange}
                required
              />

              <TextField
                label="Nombre de usuario"
                variant="outlined"
                fullWidth
                margin="normal"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <TextField
                label="Contraseña"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <StyledButton
                variant="contained"
                fullWidth
                onClick={handleSignup}
              >
                Registrar
              </StyledButton>
              
           
           <div className="text-center p-2">
          <Button onClick={() => navigate('/homeUser')} variant="secondary">
            <RiArrowGoBackFill /> Cancelar
          </Button>
          </div>
      
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
};

export default CreateUser;
