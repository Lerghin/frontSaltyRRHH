import  { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LS } from '../../Utils/LS';
import SideBarUsers from '../../Componentes/SideBarUsers';
import { API } from '../../Utils/axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Css/home.css';

const HomeUser = () => {
  const [userRole, setUserRole] = useState(null);
  const [userID, setUserId] = useState(null);
const [idApplicant, setIdApplicant]= useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState(null); // Almacena los detalles del usuario y del aplicante si es necesario

  useEffect(() => {
    const role = LS.getText('role');
    const idUser = LS.getText('userId');
   
    if (role) {
      setUserRole(role.trim());
    }
    if (idUser) {
      setUserId(idUser.trim().toString());
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(`/users/${userID}`);
        const user = response.data;
        
        setIdApplicant(response.data.idApplicant)
        
        setUserDetails(user);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchData();
    }
  }, [userID]); // Siempre que userID cambie, se realiza la solicitud API

  const navigate = useNavigate();

  return (
  
    <div className="home">
       <SideBarUsers className="home-sidebar" />
      <div className="cardHome">
        {userRole !== 'USER' && (
          <Card className="cardIn" style={{ width: '18rem' }}>
            <Card.Img className="img-card" variant="top" src="https://media.istockphoto.com/id/981837248/es/vector/icono-de-selecci%C3%B3n-de-personal.jpg?s=612x612&w=0&k=20&c=V9YTsog1M6ndN9ly8bkxp9cf6RMs65Ufr_Scczwlhns=" />
            <Card.Body>
              <Card.Title>Vacantes</Card.Title>
              <Card.Text>Gestión de Vacantes</Card.Text>
              <Button onClick={() => navigate('/vacantes')} variant="btn btn-secondary">Gestionar</Button>
            </Card.Body>
          </Card>
        )}
        {userRole !== 'ADMIN' && (
          <Card className="cardIn" style={{ width: '18rem' }}>
            <Card.Img className="img-card" variant="top" src="https://imagenes.eltiempo.com/files/image_1200_600/uploads/2023/10/12/652852379fc43.png" />
            <Card.Body>
              <Card.Title><b>Vacantes</b></Card.Title>
              <Card.Text>Aplica a las mejores ofertas laborales</Card.Text>
              <Button onClick={() => navigate('/vacantUser')} variant="btn btn-secondary">Ver </Button>
            </Card.Body>
          </Card>
        )}
        {userRole !== 'ADMIN' && userDetails && ( // Asegúrate de que userDetails esté disponible antes de renderizar esta parte
          <Card className="cardIn" style={{ width: '18rem' }}>
            <Card.Img className="img-card" variant="top" src="https://wwwhatsnew.com/wp-content/uploads/2018/02/Apps-para-hacer-un-curriculum-vitae-desde-el-smartphone-730x350.jpg" />
            <Card.Body>
              <Card.Title><b>Mi CV</b></Card.Title>
              <Card.Text>Puedes añadir información o editar tu CV</Card.Text>
              <Button onClick={() => navigate(`/verCv/${idApplicant}`)} variant="btn btn-secondary">IR </Button>
            </Card.Body>
          </Card>
        )}
         {userRole !== 'ADMIN' && userDetails && ( // Asegúrate de que userDetails esté disponible antes de renderizar esta parte
          <Card className="cardIn" style={{ width: '18rem' }}>
            <Card.Img className="img-card" variant="top" src="https://static.vecteezy.com/system/resources/previews/003/421/759/non_2x/checklist-to-do-list-concept-business-idea-vector.jpg" />
            <Card.Body>
              <Card.Title><b>Mis Postulaciones</b></Card.Title>
      
              <Card.Text>Ver mis postulaciones</Card.Text>
              <br /> 
              <Button onClick={() => navigate('/myapp')} variant="btn btn-secondary">IR </Button>
            </Card.Body>
          </Card>
        )}
        {userRole !== 'USER' && (
          <Card className="cardIn" style={{ width: '18rem' }}>
            <Card.Img className="img-card" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dBjSy5wKWwdIwHjB9oecrcTUv71kI9yj-Q&s" />
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestión de Usuarios</Card.Text>
              <Button onClick={() => navigate('/users')} variant="btn btn-secondary">Gestionar</Button>
            </Card.Body>
          </Card>
        )}
        {userRole !== 'USER' && (
          <Card className="cardIn" style={{ width: '18rem' }}>
            <Card.Img className="img-card" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHzHUiTA6PbbIm1tnxYgOxRv7WBU4O1DlH4TdwkKjrxqEOBC1Psw4pgUIFyA5eytRQMr8&usqp=CAU" />
            <Card.Body>
              <Card.Title>Aplicantes</Card.Title>
              <Card.Text>Gestión de Aplicantes</Card.Text>
              <Button onClick={() => navigate('/aplicantes')} variant="btn btn-secondary">Gestionar</Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default HomeUser;
