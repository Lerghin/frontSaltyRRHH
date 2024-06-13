import { useEffect, useRef } from 'react';
import {
  Container,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { API } from '../Utils/axios';


import { LS } from './../Utils/LS.js';
import { login } from '../Store/Actions/authActions.js';
const Root = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 400,
  width: '100%',
  backgroundColor: '#fff',
}));

const Title = styled(Typography)({
  marginBottom: '16px',
  color: '#000',
  textAlign: 'center',
});

const WelcomeTitle = styled(Typography)({
  marginBottom: '32px',
  color: '#000',
  textAlign: 'center',
  fontWeight: 'bold',
});

const StyledButton = styled(Button)({
  backgroundColor: '#f50057',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#c51162',
  },
});

const Link = styled('a')({
  marginTop: '16px',
  display: 'block',
  textAlign: 'center',
  color: '#000',
  textDecoration: 'none',
});

const Signin = () => {
  const inputUsername = useRef();
  const inputPass = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const token = LS.getText('token');
    if (token) {
      dispatch(login({ token }));
      navigate('/homeuser');
    }
  }, [dispatch, navigate]); 

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del formulario

    const userData = {
      username: inputUsername.current.value,
      password: inputPass.current.value,
    };

    try {
      const res = await API.post('/auth/login', userData);
      dispatch(login(res.data));
      if (res.status === 200) {
       
       
        const { token, role } = res.data;
        LS.set('token', token);
        LS.set('role', role);
        
          navigate('/homeUser');
       
      }
    } catch (error) {
      alert("usuario o contraseña invalida");
      console.error(error);
    }
  };

  return (
    <Root>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <WelcomeTitle variant="h4">
              Bienvenid@ a Salty
            </WelcomeTitle>
            <StyledPaper elevation={3}>
              <form onSubmit={handleSubmit}>
                <Title variant="h5">
                  Iniciar Sesión
                </Title>
                <TextField
                  label="Correo electrónico"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  inputRef={inputUsername}
                />
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  fullWidth
                  margin="normal"
                  inputRef={inputPass}
                />
                <StyledButton
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Iniciar Sesión
                </StyledButton>
              </form>
              <Link href="/">
                ¿No tienes una cuenta? Regístrate
              </Link>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Root>
  );
};

export default Signin;
