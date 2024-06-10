import ResponsiveSideBar from ".././../Componentes/ResponsiveSideBar";
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import '../Css/home.css'
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from 'react'
import { LS } from "../../Utils/LS";
LS
const HomeUser = () => {
  const [userRole, setUserRole] = useState(null);
  useEffect(() => {
    const role = LS.getText("role");
    if (role) {
      setUserRole(role.trim()); 
    }
   console.log("error")
  }, []);

  const navigate= useNavigate()
  return (

     <div className="home">
      <ResponsiveSideBar  className="home-sidebar" />
      <div className='cardHome'>

      <Card className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://png.pngtree.com/png-vector/20210618/ourmid/pngtree-pink-colour-job-vacancy-design-png-image_3456565.jpg" />
          <Card.Body>
            <Card.Title>Vacantes</Card.Title>
            <Card.Text>
              Gestión de Vacantes
            </Card.Text>
            <br></br>
            <Button  onClick={() => navigate('/vacantes')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>
        
        { userRole==='USER'? null :(    <Card  className="cardIn" style={{ width: '18rem' }}>
          <Card.Img className="img-card" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-dBjSy5wKWwdIwHjB9oecrcTUv71kI9yj-Q&s" />
          <Card.Body>
            <Card.Title>Usuarios </Card.Title>
            <Card.Text>
              Gestión de Usuarios con acceso al sistema
            </Card.Text>
            <br></br>
            <Button onClick={() => navigate('/users')} variant="btn btn-secondary" >Gestionar</Button>
          </Card.Body>
        </Card>    )   }
     
        
        
    
         </div>
         </div>
       
  )
};

export default HomeUser;
