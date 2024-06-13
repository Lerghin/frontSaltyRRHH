import jsPDF from 'jspdf';
import 'jspdf-autotable';

const addLogo = (doc) => {
  const imgData = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTxUixxU9wdmrR8gAqDq9VLc8SOs1xPV-I-Q&s'; // URL del logo
  doc.addImage(imgData, 'JPEG', 10, 10, 50, 20); // Añadir logo
};

export const generatePDFApplicant = (applicant, studiesList, jobsList, coursesList) => {
  const doc = new jsPDF();

  // Añadir logo
  addLogo(doc);

  // Configuración de fuentes y colores
  doc.setFontSize(24);
  doc.setTextColor(34, 34, 34); // Gris oscuro
  doc.text("Curriculum Vitae", 70, 40);

  // Dibujar línea de separación
  doc.setDrawColor(220, 20, 60); // Rojo carmesí
  doc.setLineWidth(1.5);
  doc.line(10, 45, 200, 45);

  // Información del candidato
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  doc.text("Información Personal", 10, 55);

  const applicantInfo = [
    ["Nombre Completo", `${applicant.firstName} ${applicant.lastName}`],
    ["Cédula", applicant.cedula],
    ["Sexo", applicant.sexo],
    ["Edad", applicant.edad],
    ["Fecha de Nacimiento", applicant.birthDate],
    ["Nacionalidad", applicant.nationality],
    ["País", applicant.country],
    ["Dirección", applicant.address],
    ["Teléfono", applicant.cellphone1],
    ["Email", applicant.email]
  ];

  doc.autoTable({
    startY: 60,
    head: [['Campo', 'Descripción']],
    body: applicantInfo,
    styles: {
      fontSize: 12,
      halign: 'left',
      textColor: [34, 34, 34], // Gris oscuro
      cellPadding: 4,
      lineWidth: 0.5
    },
    headStyles: {
      fillColor: [34, 34, 34], // Gris oscuro
      textColor: [255, 255, 255] // Blanco
    },
    alternateRowStyles: {
      fillColor: [240, 240, 240] // Gris muy claro
    },
    margin: { top: 60 }
  });

  // Historial Académico
  if (studiesList.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Historial Académico", 10, doc.lastAutoTable.finalY + 20);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 25,
      head: [['Institución', 'Título', 'Fecha de Inicio', 'Fecha de Fin', 'Descripción']],
      body: studiesList.map(study => [
        study.institutionName,
        study.degree,
        study.startDate,
        study.endDate,
        study.description
      ]),
      styles: {
        fontSize: 12,
        halign: 'left',
        textColor: [34, 34, 34], // Gris oscuro
        cellPadding: 4,
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: [34, 34, 34], // Gris oscuro
        textColor: [255, 255, 255] // Blanco
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // Gris muy claro
      },
      margin: { top: 25 }
    });
  }

  // Experiencia Laboral
  if (jobsList.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Experiencia Laboral", 10, doc.lastAutoTable.finalY + 20);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 25,
      head: [['Empresa', 'Posición', 'Fecha de Inicio', 'Fecha de Fin', 'Descripción']],
      body: jobsList.map(job => [
        job.jobName,
        job.position,
        job.startDate,
        job.endDate,
        job.description
      ]),
      styles: {
        fontSize: 12,
        halign: 'left',
        textColor: [34, 34, 34], // Gris oscuro
        cellPadding: 4,
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: [34, 34, 34], // Gris oscuro
        textColor: [255, 255, 255] // Blanco
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // Gris muy claro
      },
      margin: { top: 25 }
    });
  }

  // Cursos Realizados
  if (coursesList.length > 0) {
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("Cursos Realizados", 10, doc.lastAutoTable.finalY + 20);

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 25,
      head: [['Curso', 'Institución', 'Fecha de Finalización']],
      body: coursesList.map(course => [
        course.nameCourse,
        course.nameInstitution,
        course.date
      ]),
      styles: {
        fontSize: 12,
        halign: 'left',
        textColor: [34, 34, 34], // Gris oscuro
        cellPadding: 4,
        lineWidth: 0.5
      },
      headStyles: {
        fillColor: [34, 34, 34], // Gris oscuro
        textColor: [255, 255, 255] // Blanco
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240] // Gris muy claro
      },
      margin: { top: 25 }
    });
  }

  // Fecha de generación del documento
  const date = new Date();
  const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  doc.setFontSize(10);
  doc.setTextColor(34, 34, 34); // Gris oscuro
  doc.text(`Generado el: ${dateStr}`, 10, doc.lastAutoTable.finalY + 15);

  // Guardar el PDF
  doc.save(`cv_${applicant.firstName}_${applicant.lastName}_${applicant.cedula}.pdf`);
};
