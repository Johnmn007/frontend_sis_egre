import React, { useState } from "react";
import { FileText } from "lucide-react";
import jsPDF from "jspdf";
import style from "./Detalles.module.css";
import { useParams } from "react-router-dom";
import { detalleViewTitle } from "../../../service/Student";
import { getIdDepartaments, getIdProvincias, getIdDistritos } from "../../../service/Ubigeo";

const ReportePdf = ({ studentId }) => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // idCarrera desde la URL

  const handleClick = async () => {
    if (!studentId) return;

    try {
      setLoading(true);

      // 1️⃣ Obtener todos los datos del estudiante
      const data = await detalleViewTitle(studentId);
      

      if (!Array.isArray(data.titulados) || data.titulados.length === 0) {
        console.warn("El estudiante no tiene títulos registrados");
        setLoading(false);
        return;
      }

      // 2️⃣ Buscar la carrera/título actual
      const tituloActual = data.titulados.find(
        (titulo) => Number(titulo.profession?.id) === Number(id)
      );

      if (!tituloActual) {
        console.warn("No se encontró la carrera actual para el estudiante");
        setLoading(false);
        return;
      }

      // 3️⃣ Obtener seguimiento (información adicional)
      const seguimiento = tituloActual.seguimientos?.[0] || {};

      // 4️⃣ Obtener ubigeo por ID
      const dep = await getIdDepartaments(data.id_departamento);
      const prov = await getIdProvincias(data.id_Provincia);
      const dis = await getIdDistritos(data.id_distrito);

      // 5️⃣ Generar el PDF
      generarPDF({
        nombre: `${data.lastName || ""} ${data.firstName || ""}`,
        dni: String(data.dni || ""),
        region: String(dep?.name || ""),
        provincia: String(prov?.name || ""),
        distrito: String(dis?.name || ""),
        direccion: String(data.address || ""),
        correo: String(data.email || ""),
        celular: String(data.celular || ""),
        // --- Título ---
        profesion: String(tituloActual.profession?.nameProfession || ""),
        modalidad: String(tituloActual.modalidad?.descrition || ""),
        fechaTitulacion: String(tituloActual.ageTitle || ""),
        numeroResolucion: String(tituloActual.numberResolution || ""),
        numeroTitulo: String(tituloActual.numberTitle || ""),
        // --- Seguimiento / Información adicional ---
        tipoInstitucion: String(seguimiento.typeInstitution || "No disponible"),
        tipoContrato: String(seguimiento.position || "No disponible"),
        entidad: String(seguimiento.company || "No disponible"),
        fechaIngreso: String(seguimiento.fecha_inicio || "No disponible"),
        fechaSalida: String(seguimiento.fecha_fin || "No disponible"),
        trabajo: seguimiento ? "SI" : "NO",
      });
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    } finally {
      setLoading(false);
    }
  };

  const generarPDF = (info) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // --- SECCIÓN 1 ---
    doc.setFont(undefined, "bold");
    doc.text("DATOS DEL TITULADO", 105, 20, { align: "center" });
    doc.setFont(undefined, "normal");

    doc.text("Nombre:", 20, 30);
    doc.text(String(info.nombre || ""), 70, 30);
    doc.line(68, 31, 190, 31);

    doc.text("DNI:", 20, 38);
    doc.text(String(info.dni || ""), 70, 38);
    doc.line(68, 39, 190, 39);

    // --- SECCIÓN 2 ---
    doc.setFont(undefined, "bold");
    doc.text("DOMICILIO ACTUAL Y CONTACTOS", 105, 55, { align: "center" });
    doc.setFont(undefined, "normal");

    const domicilio = [
      ["Región:", info.region],
      ["Provincia:", info.provincia],
      ["Distrito:", info.distrito],
      ["Dirección:", info.direccion],
      ["Correo Electrónico:", info.correo],
      ["Número de Celular:", info.celular],
    ];

    let y = 65;
    domicilio.forEach(([label, value]) => {
      doc.text(String(label), 20, y);
      doc.text(String(value || ""), 70, y);
      doc.line(68, y + 1, 190, y + 1);
      y += 8;
    });

    // --- SECCIÓN 3 ---
    doc.setFont(undefined, "bold");
    doc.text("INFORMACIÓN ADICIONAL DEL TITULADO", 105, y + 5, { align: "center" });
    doc.setFont(undefined, "normal");

    const infoExtra = [
      ["Tipo de Institución:", info.tipoInstitucion],
      ["Tipo de Contrato:", info.tipoContrato],
      ["Entidad:", info.entidad],
      ["Fecha de Ingreso:", info.fechaIngreso],
      ["Fecha de Salida:", info.fechaSalida],
      ["Trabajo:", info.trabajo],
    ];

    y += 15;
    infoExtra.forEach(([label, value]) => {
      doc.text(String(label), 20, y);
      doc.text(String(value || ""), 70, y);
      doc.line(68, y + 1, 190, y + 1);
      y += 8;
    });

    doc.save(`${info.nombre || "Reporte"}.pdf`);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      title="Generar Reporte PDF"
      className={style.detallesBtn}
    >
      {loading ? "..." : <FileText size={18} />}
    </button>
  );
};

export default ReportePdf;
