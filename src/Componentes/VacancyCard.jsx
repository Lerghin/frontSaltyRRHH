
import { Card, Button } from 'react-bootstrap';

const VacancyCard = ({ vacancy, onApply }) => {
  return (
    <Card className="m-3" style={{ maxWidth: '300px' }}>
      <Card.Body>
        <Card.Title>{vacancy.nombreVacante}</Card.Title>
        <Card.Text>
          <strong>Estado:</strong> {vacancy.status}
        </Card.Text>
        <Card.Text>
          <strong>Descripción del puesto:</strong> {vacancy.descripcion}
        </Card.Text>
        <Card.Text>
          <strong>Requisitos:</strong> {vacancy.requisitos}
        </Card.Text>
        <Button onClick={() => onApply(vacancy.id)} variant="primary">
          Postularse
        </Button>
      </Card.Body>
    </Card>
  );
};

export default VacancyCard;
