
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Css/home.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { LS } from "../../Utils/LS";
import SideBarUsers from "../../Componentes/SideBarUsers";

const HomeUser = () => {
  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim());
    }
  }, []);

  const navigate = useNavigate();
  
  return (
    <div className="home">
      <SideBarUsers className="home-sidebar" />
      <div className='cardHome'>
      { userRole !== 'USER' && (
        <Card className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://media.istockphoto.com/id/981837248/es/vector/icono-de-selecci%C3%B3n-de-personal.jpg?s=612x612&w=0&k=20&c=V9YTsog1M6ndN9ly8bkxp9cf6RMs65Ufr_Scczwlhns=" />
          <Card.Body>
            <Card.Title>Vacantes</Card.Title>
            <Card.Text>Gestión de Vacantes</Card.Text>
            <Button onClick={() => navigate('/vacantes')} variant="btn btn-secondary">Gestionar</Button>
          </Card.Body>
        </Card>
          )}
          { userRole !== 'ADMIN' && (
         <Card className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://imagenes.eltiempo.com/files/image_1200_600/uploads/2023/10/12/652852379fc43.png" />
          <Card.Body>
            <Card.Title> <b>Vacantes</b></Card.Title>
            <Card.Text>Aplica a las mejores ofertas laborales</Card.Text>
            <Button onClick={() => navigate('/vacantesUser')} variant="btn btn-secondary">Ver </Button>
          </Card.Body>
        </Card>
       )}
         { userRole == 'USER' && (
        <Card className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://wwwhatsnew.com/wp-content/uploads/2018/02/Apps-para-hacer-un-curriculum-vitae-desde-el-smartphone-730x350.jpg" />
          <Card.Body>
            <Card.Title> <b>Mi CV</b></Card.Title>
            <Card.Text>Puedes añadir información o editar tu CV</Card.Text>
            <Button onClick={() => navigate('/vacantesUser')} variant="btn btn-secondary">IR </Button>
          </Card.Body>
        </Card>
         )}
        
        { userRole !== 'USER' && (
          <Card className="cardIn" style={{ width: '18rem' }}>
            <Card.Img className="img-card" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dBjSy5wKWwdIwHjB9oecrcTUv71kI9yj-Q&s" />
            <Card.Body>
              <Card.Title>Usuarios</Card.Title>
              <Card.Text>Gestión de Usuarios</Card.Text>
              <Button onClick={() => navigate('/users')} variant="btn btn-secondary">Gestionar</Button>
            </Card.Body>
          </Card>
          
        )}
          { userRole !== 'USER' && (
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