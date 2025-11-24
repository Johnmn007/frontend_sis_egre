import React, { useState, useEffect } from 'react';
import { detalleView } from '../../service/Student';
import { getIdDepartaments, getIdProvincias, getIdDistritos } from '../../service/Ubigeo';
import styleM from '../../assets/css/detalle/Modal.module.css'; 

const DetalleStudent = ({ onClose, studentId }) => {
  const [studentDetails, setStudentDetails] = useState(null);
  const [Departamento, setDepartamento] = useState({});
  const [Provincia, setProvincia] = useState({});
  const [Distrito, setDistrito] = useState({});
  const [graduadoActual, setGraduadoActual] = useState(null);

  useEffect(() => {
    const fetchDetalle = async () => {
      try {
        const data = await detalleView(studentId);
        setStudentDetails(data);

        // Buscar solo el graduado actual (según la profesión actual)
        const graduado = data.egresados.find(
          (egresado) => Number(egresado.profession?.id) === Number(data.currentProfessionId)
        );
        setGraduadoActual(graduado);

        // Cargar ubicación
        const dep = await getIdDepartaments(data.id_departamento);
        setDepartamento(dep);

        const prov = await getIdProvincias(data.id_Provincia);
        setProvincia(prov);
        
        const dis = await getIdDistritos(data.id_distrito);
        setDistrito(dis);

      } catch (error) {
        console.error("Error al obtener los detalles del estudiante:", error);
      }
    };

    fetchDetalle();
  }, [studentId]);

  return (
    <div className={styleM.modalOverlay}>
      <div className={styleM.modalContent}>
        {/* Botón de cerrar */}
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

            {/* Información del graduado actual */}
            <h3 className={styleM.sectionTitle}>📚 Graduado Actual</h3>
            {graduadoActual ? (
              <div className={styleM.egresadoCard}>
                <p><strong>Profesión:</strong> {graduadoActual.profession?.nameProfession}</p>
                <p><strong>Año de Ingreso:</strong> {graduadoActual.ageEntry}</p>
                <p><strong>Año de Graduación:</strong> {graduadoActual.ageGraduation}</p>
                {graduadoActual.Observacion && (
                  <p><strong>Observación:</strong> {graduadoActual.Observacion}</p>
                )}

                {/* Título si existe */}
                {graduadoActual.titulo ? (
                  <div className={styleM.tituloBox}>
                    <p><strong>🏅 Título</strong></p>
                    <p><strong>Año:</strong> {graduadoActual.titulo.ageTitle}</p>
                    <p><strong>Número de Título:</strong> {graduadoActual.titulo.numberTitle}</p>
                    <p><strong>Resolución:</strong> {graduadoActual.titulo.numberResolution}</p>
                    <p><strong>Modalidad:</strong> {graduadoActual.titulo.idModalidad}</p>
                  </div>
                ) : (
                  <p><em>Sin título registrado</em></p>
                )}
              </div>
            ) : (
              <p className={styleM.noData}>No se encontró información del graduado actual.</p>
            )}
          </div>
        ) : (
          <p className={styleM.noData}>Cargando detalles...</p>
        )}
      </div>
    </div>
  );
};

export default DetalleStudent;
