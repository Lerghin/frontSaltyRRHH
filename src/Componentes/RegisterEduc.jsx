import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../utils/axios";

const CreateEducation = () => {
  const [education, setEducation] = useState({
    institutionName: "",
    degree: "",
    startDate: "",
    endDate: "",
    description: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setEducation({ ...education, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("http://localhost:8080/education/create", education);
      toast.success("Educación registrada con éxito");
      navigate('/education/list');
      setEducation({ institutionName: "", degree: "", startDate: "", endDate: "", description: "" });
    } catch (error) {
      console.error("Error al registrar la educación:", error);
      toast.error("Error al registrar la educación");
    }
  };

  return (
    <div className="home">
      <Container className="mt-5">
        <h2 className="text-center p-2"><b>Registrar Educación</b></h2>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formInstitutionName">
              <Form.Label>Nombre de la Institución</Form.Label>
              <Form.Control
                type="text"
                name="institutionName"
                value={education.institutionName}
                onChange={handleChange}
                placeholder="Ingresa el nombre de la institución"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formDegree">
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                name="degree"
                value={education.degree}
                onChange={handleChange}
                placeholder="Ingresa el título"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formStartDate">
              <Form.Label>Fecha de Inicio</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={education.startDate}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formEndDate">
              <Form.Label>Fecha de Fin</Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={education.endDate}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group controlId="formDescription" className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={education.description}
              onChange={handleChange}
              placeholder="Ingresa la descripción"
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="success" type="submit">
              Registrar Educación
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default CreateEducation;
