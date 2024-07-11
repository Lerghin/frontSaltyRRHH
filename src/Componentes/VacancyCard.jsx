import React from 'react';
import { Button } from 'react-bootstrap';

const VacancyCard = ({ vacancy, onApply }) => {
  return (
    <tr>
      <td>{vacancy.nombreVacante}</td>
      <td>{vacancy.status}</td>
      <td>{vacancy.descripcion}</td>
      <td>{vacancy.requisitos}</td>
      <td>
        <Button variant="primary" onClick={() => onApply(vacancy.id)}>
          Postularse
        </Button>
      </td>
    </tr>
  );
};

export default VacancyCard;
