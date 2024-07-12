import React from 'react';
import { Container, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

const Root = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f5f5f5',
});

const StyledContainer = styled(Container)({
  paddingTop: '2rem',
  paddingBottom: '2rem',
});

const Title = styled(Typography)({
  marginBottom: '1rem',
  textAlign: 'center',
});

const Subtitle = styled(Typography)({
  marginBottom: '2rem',
  textAlign: 'center',
});

const ButtonWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
});

const LandingPage = () => {
  return (
    <Root>
      <StyledContainer maxWidth="md">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12}>
            <Title variant="h3">Bienvenido a Salty</Title>
            <Subtitle variant="h5">Tu plataforma de snacks favorita</Subtitle>
          </Grid>
         
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              Descubre nuestra increíble selección de snacks saludables y deliciosos.
              ¿Listo para comenzar tu experiencia?
            </Typography>
            <ButtonWrapper>
              <Button variant="contained" color="primary" component={Link} to="/signin">
                Iniciar Sesión
              </Button>
            </ButtonWrapper>
          </Grid>
        </Grid>
      </StyledContainer>
    </Root>
  );
};

export default LandingPage;
