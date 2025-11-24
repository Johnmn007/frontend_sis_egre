import React, { useState, useEffect } from "react";
import { getTecProf } from "../../../service/tecProfessional";
import { getModalidad } from "../../../service/modalidades";
import style from "../../../assets/css/TableCarrera.module.css";

const TableCarrera = ({ studentCarrera }) => {
  const [professions, setProfessions] = useState([]);
  const [modalidades, setModalidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profData = await getTecProf();
        setProfessions(profData);
        const modData = await getModalidad();
        setModalidades(modData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const getProfessionName = (id) => {
    const prof = professions.find((p) => p.id == id);
    return prof ? prof.nameProfession : "Desconocido";
  };
  const getModalidadName = (id) => {
    const mod = modalidades.find((m) => m.id == id);
    return mod ? mod.descrition : "Desconocido";
  }
  // 🔹 Filtramos los que tienen titulo
  const studentTitulos = studentCarrera
    .filter((card) => card.titulo) // solo los que tienen titulo
    .map((card) => card.titulo);   // obtenemos solo el objeto titulo

  return (
    <div className={style.tableWrapper}>
      {/* Tabla de Carreras */}
      <h2 className={style.title}>Carreras del Estudiante</h2>
      <div className={style.tableContainer}>
        <table className={style.tableCarrera}>
          <thead>
            <tr>
              <th>Profesión</th>
              <th>Año de Ingreso</th>
              <th>Año de Graduación</th>
              <th>Certificados Modulares</th>
            </tr>
          </thead>
          <tbody>
            {studentCarrera.length > 0 ? (
              studentCarrera.map((card, index) => (
                <tr key={index}>
                  <td>{getProfessionName(card.idProfessional)}</td>
                  <td>{card.ageEntry}</td>
                  <td>{card.ageGraduation}</td>
                  <td>
                    <span
                      className={
                        card.certificadosModulares == 1
                          ? style.badgeYes
                          : style.badgeNo
                      }
                    >
                      {card.certificadosModulares == 1 ? "Sí" : "No"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className={style.emptyMessage}>
                  No hay carreras registradas
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

     {/* Tabla de Títulos - solo si existen */}
      {studentTitulos.length > 0 && (
        <>
          <h2 className={style.title}>Títulos del Estudiante</h2>
          <div className={style.tableContainer}>
            <table className={style.tableCarrera}>
              <thead>
                <tr>
                  <th>Profesión</th>
                  <th>Año de Titulación</th>
                  <th>N° de Resolución</th>
                  <th>N° de Título</th>
                  <th>Modalidad</th>
                </tr>
              </thead>
              <tbody>
                {studentTitulos.map((titulo, index) => (
                  <tr key={index}>
                    <td>{titulo.profession?.nameProfession || "Desconocido"}</td>
                    <td>{titulo.ageTitle}</td>
                    <td>{titulo.numberResolution}</td>
                    <td>{titulo.numberTitle}</td>
                    <td>{getModalidadName(titulo.idModalidad)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

    </div>
  );
};

export default TableCarrera;
