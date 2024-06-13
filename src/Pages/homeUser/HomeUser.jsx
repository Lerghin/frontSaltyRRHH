import ResponsiveSideBar from "../../Componentes/ResponsiveSideBar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../Css/home.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { LS } from "../../Utils/LS";

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
      <ResponsiveSideBar className="home-sidebar" />
      <div className='cardHome'>
        <Card className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://media.istockphoto.com/id/981837248/es/vector/icono-de-selecci%C3%B3n-de-personal.jpg?s=612x612&w=0&k=20&c=V9YTsog1M6ndN9ly8bkxp9cf6RMs65Ufr_Scczwlhns=" />
          <Card.Body>
            <Card.Title>Vacantes</Card.Title>
            <Card.Text>Gestión de Vacantes</Card.Text>
            <Button onClick={() => navigate('/vacantes')} variant="btn btn-secondary">Gestionar</Button>
          </Card.Body>
        </Card>
        
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
      </div>
    </div>
  );
};

export default HomeUser;