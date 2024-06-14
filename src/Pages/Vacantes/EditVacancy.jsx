import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { BiSolidSave } from 'react-icons/bi';
import { API } from '../../Utils/axios';


const EditVacancy = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el ID de la vacante desde los parámetros de la URL

  const [vacancyData, setVacancyData] = useState({
    fecha: '',
    nombreVacante: '',
    cantidadDisponible: 0,
    cantidadCubierta: 0,
    status: '',
    requisitos: '',
    descripcion:''
  });

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        const { data } = await API.get(`/vacant/get/${id}`); // Endpoint para obtener los detalles de la vacante por su ID
        setVacancyData(data); // Actualizar el estado con los datos de la vacante
      } catch (error) {
        console.error('Error fetching vacancy:', error);
        toast.error('Error al cargar los detalles de la vacante');
      }
    };

    fetchVacancy();
  }, [id]);

  const handleChange = (e) => {
    setVacancyData({ ...vacancyData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Datos a enviar:', vacancyData);
      await API.put(`/vacant/edit/${id}`, vacancyData); // Endpoint para actualizar la vacante por su ID
       alert('Vacante actualizada con éxito');
      navigate('/vacantes');
    } catch (error) {
      console.error('Error updating vacancy:', error);
      toast.error('Error al actualizar la vacante');
    }
  };

  return (
    <Container>
      <h2 className="flex justify-center font-bold translate-x-4 m-10 font- p-4 m-2">
        Editar Vacante
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
          <Row className="mb-3">
          <Form.Group as={Col} controlId="formDescripcion">
            <Form.Label>Descripción del Cargo</Form.Label>
            <Form.Control
              type="text"
              as="textarea"  // Indica que el control es un textarea
              rows={3} 
              name="descripcion"
              value={vacancyData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>
          </Row>
          <Form.Group as={Col} controlId="formRequisitos">
            <Form.Label>Requisitos del Cargo</Form.Label>
            <Form.Control
              type="text"
              as="textarea"  // Indica que el control es un textarea
              rows={3} 
              name="requisitos"
              value={vacancyData.requisitos}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
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
            <BiSolidSave /> Guardar Cambios
          </Button>
          <Button onClick={() => navigate('/vacantes')} variant="secondary">
            <RiArrowGoBackFill /> Cancelar
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditVacancy;
