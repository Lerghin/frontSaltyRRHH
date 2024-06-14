import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { BiSolidSave } from 'react-icons/bi';
import { API } from '../../Utils/axios';
import '../Css/home.css';

const CreateVacancy = () => {
  const navigate = useNavigate();

  // Estado para almacenar los datos del formulario
  const [vacancyData, setVacancyData] = useState({
    fecha: '',
    nombreVacante: '',
    cantidadDisponible: 0,
    cantidadCubierta: 0,
    status: '',
    descripcion: '',
    requisitos: ''
  });

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setVacancyData({ ...vacancyData, [e.target.name]: e.target.value });
  };

  // Enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Datos a enviar:', vacancyData);
      const { data } = await API.post('/vacant/create', vacancyData);
      console.log(data);
      toast.success(data.message);
      alert('Vacante creada con éxito');
      navigate('/vacantes');
    } catch (error) {
      const { message } = error.response.data;
      console.error(error);
      toast.error(message);
    }
  };

  return (
    <Container>
      <h2 className="flex justify-center font-bold translate-x-4 m-10 font- p-4 m-2">
        Crear Vacante
      </h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formNombreVacante">
            <Form.Label>Nombre de la Vacante</Form.Label>
            <Form.Control
              type="text"
              name="nombreVacante"
              value={vacancyData.nombreVacante}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formFecha">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="fecha"
              value={vacancyData.fecha}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formCantidadDisponible">
            <Form.Label>Cantidad Disponible</Form.Label>
            <Form.Control
              type="number"
              name="cantidadDisponible"
              value={vacancyData.cantidadDisponible}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formCantidadCubierta">
            <Form.Label>Cantidad Cubierta</Form.Label>
            <Form.Control
              type="number"
              name="cantidadCubierta"
              value={vacancyData.cantidadCubierta}
              onChange={handleChange}
              required
            />
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formDescripcion">
            <Form.Label>Descripción del Cargo</Form.Label>
            <Form.Control
            as="textarea"  // Indica que el control es un textarea
            rows={3} 
              type="text"
              name="descripcion"
              value={vacancyData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formRequisitos">
            <Form.Label>Requisitos del Cargo</Form.Label>
            <Form.Control
              as="textarea"  // Indica que el control es un textarea
              rows={3} 
              type="text"
              name="requisitos"
              value={vacancyData.requisitos}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
          <Row className="mb-3">
          
          <Form.Group as={Col} controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={vacancyData.status}
              onChange={handleChange}
              required
            >
              <option value="">Seleccionar Status</option>
              <option value="Activa">Activa</option>
              <option value="Inactiva">Inactiva</option>
            </Form.Control>
          </Form.Group>
        </Row>
        <br />
        <div className="d-flex justify-center gap-5 p-4 h-100vh  ">
          <Button variant="success" type="submit">
            <BiSolidSave /> Guardar
          </Button>
          <Button onClick={() => navigate('/vacantes')} variant="secondary">
            <RiArrowGoBackFill /> Volver
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default CreateVacancy;
