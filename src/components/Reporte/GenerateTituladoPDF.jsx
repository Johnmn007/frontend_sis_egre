import React from "react";
import { FileText  } from "lucide-react";
import jsPDF from "jspdf";

const ReportePdf = ({ data }) => {
  const generarPDF = () => {
    const doc = new jsPDF();

    // Fuente y tamaño
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // --- SECCIÓN 1: DATOS DEL TITULADO ---
    doc.setFont(undefined, "bold");
    doc.text("DATOS DEL TITULADO", 105, 20, { align: "center" });
    doc.setFont(undefined, "normal");

    doc.text("Nombre:", 20, 30);
    doc.text(data.nombre || "", 70, 30);
    doc.line(68, 31, 190, 31);

    doc.text("DNI:", 20, 38);
    doc.text(data.dni || "", 70, 38);
    doc.line(68, 39, 190, 39);

    // --- SECCIÓN 2: DOMICILIO ACTUAL Y CONTACTOS ---
    doc.setFont(undefined, "bold");
    doc.text("DOMICILIO ACTUAL Y CONTACTOS", 105, 55, { align: "center" });
    doc.setFont(undefined, "normal");

    const yStart = 65;
    const lineSpacing = 8;

    const domicilio = [
      ["Región:", data.region],
      ["Provincia:", data.provincia],
      ["Distrito:", data.distrito],
      ["Dirección:", data.direccion],
      ["Correo Electrónico:", data.correo],
      ["Número de Celular:", data.celular],
    ];

    domicilio.forEach(([label, value], index) => {
      const y = yStart + index * lineSpacing;
      doc.text(label, 20, y);
      doc.text(value || "", 70, y);
      doc.line(68, y + 1, 190, y + 1);
    });

    // --- SECCIÓN 3: INFORMACIÓN ADICIONAL DEL TITULADO ---
    doc.setFont(undefined, "bold");
    doc.text("INFORMACIÓN ADICIONAL DEL TITULADO", 105, 120, { align: "center" });
    doc.setFont(undefined, "normal");

    const info = [
      ["Tipo de Institución:", data.tipoInstitucion],
      ["Tipo de Contrato:", data.tipoContrato],
      ["Entidad:", data.entidad],
      ["Fecha de Ingreso:", data.fechaIngreso],
      ["Fecha de Salida:", data.fechaSalida],
      ["Trabajo:", data.trabajo],
    ];

    info.forEach(([label, value], index) => {
      const y = 130 + index * lineSpacing;
      doc.text(label, 20, y);
      doc.text(value || "", 70, y);
      doc.line(68, y + 1, 190, y + 1);
    });

    // Guardar PDF
    doc.save(`${data.nombre || "Titulado"}.pdf`);
  };

  return (
    <button
      onClick={generarPDF}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
        <FileText  size={18} />
    </button>
  );
};

export default ReportePdf;
