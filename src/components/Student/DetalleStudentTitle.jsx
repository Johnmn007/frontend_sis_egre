import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { detalleViewTitle } from '../../service/Student';
import { getIdDepartaments, getIdProvincias, getIdDistritos } from '../../service/Ubigeo';
import styleM from '../../assets/css/detalle/Modal.module.css';

const DetalleStudentTitle = ({ onClose, studentId }) => {
  const { id } = useParams();

  const [studentDetails, setStudentDetails] = useState(null);
  const [Departamento, setDepartamento] = useState({});
  const [Provincia, setProvincia] = useState({});
  const [Distrito, setDistrito] = useState({});
  const [tituloActual, setTituloActual] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const data = await detalleViewTitle(studentId);
        console.log('Detalles del estudiante:', data);
        setStudentDetails(data);

        // Filtrar solo el título actual
        const titulo = data.titulados.find(
          (titulo) => Number(titulo.profession?.id) === Number(id)
        );
        setTituloActual(titulo);

        const dep = await getIdDepartaments(data.id_departamento);
        setDepartamento(dep);

        const prov = await getIdProvincias(data.id_Provincia);
        setProvincia(prov);

        const dis = await getIdDistritos(data.id_distrito);
        setDistrito(dis);
      } catch (error) {
        console.error('Error al obtener los detalles del estudiante:', error);
      }
    };

    fetchDetalle();
  }, [studentId, id]);

  return (
    <div className={styleM.modalOverlay}>
      <div className={styleM.modalContent}>
        <button className={styleM.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styleM.modalTitle}>🎓 Detalles del Estudiante</h2>

        {studentDetails ? (
          <div className={styleM.modalBody}>
            {/* Datos principales */}
            <div className={styleM.dataGrid}>
              <div className={styleM.dataItem}>
                <strong>Nombre:</strong> {studentDetails.firstName} {studentDetails.lastName}
              </div>
              <div className={styleM.dataItem}>
                <strong>Género:</strong> {studentDetails.gender}
              </div>
              <div className={styleM.dataItem}>
                <strong>Edad:</strong> {studentDetails.age}
              </div>
              <div className={styleM.dataItem}>
                <strong>Email:</strong> {studentDetails.email}
              </div>
              <div className={styleM.dataItem}>
                <strong>DNI:</strong> {studentDetails.dni}
              </div>
              <div className={styleM.dataItem}>
                <strong>Dirección:</strong> {studentDetails.address}
              </div>
              <div className={styleM.dataItem}>
                <strong>Celular:</strong> {studentDetails.celular}
              </div>
              <div className={styleM.dataItem}>
                <strong>Departamento:</strong> {Departamento?.name}
              </div>
              <div className={styleM.dataItem}>
                <strong>Provincia:</strong> {Provincia?.name}
              </div>
              <div className={styleM.dataItem}>
                <strong>Distrito:</strong> {Distrito?.name}
              </div>
            </div>

            {/* Información del título actual */}
            {tituloActual ? (
              <div className={styleM.titleSection}>
                <h3 className={styleM.subTitle}>📜 Información del Título</h3>
                <div className={styleM.dataGrid}>
                  <div className={styleM.dataItem}>
                    <strong>Modalidad:</strong> {tituloActual.modalidad?.descrition}
                  </div>
                  <div className={styleM.dataItem}>
                    <strong>Año de Titulación:</strong> {tituloActual.ageTitle}
                  </div>
                  <div className={styleM.dataItem}>
                    <strong>N° Resolución:</strong> {tituloActual.numberResolution}
                  </div>
                  <div className={styleM.dataItem}>
                    <strong>N° Título:</strong> {tituloActual.numberTitle}
                  </div>
                  <div className={styleM.dataItem}>
                    <strong>Profesión:</strong> {tituloActual.profession?.nameProfession || '—'}
                  </div>
                  {tituloActual.observacion && (
                    <div className={styleM.dataItem}>
                      <strong>Observación:</strong> {tituloActual.observacion}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p className={styleM.noTitle}>No se encontró información del título seleccionado.</p>
            )}
          </div>
        ) : (
          <p>Cargando detalles del estudiante...</p>
        )}
      </div>
    </div>
  );
};

export default DetalleStudentTitle;
