import React, { useState, useEffect } from "react";
import { getTecProf } from "../../../service/tecProfessional";
import styleM from "../../../assets/css/dashboard/Modal.module.css";

const AddCarrera = ({ onClose, studentCarrera, setStudentCarrera }) => {
  const [professions, setProfessions] = useState([]);
  const [newCarrera, setNewCarrera] = useState({
    idProfessional: "",
    ageEntry: "",
    ageGraduation: "",
    certificadosModulares: "",
    Observacion: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData] = await Promise.all([getTecProf()]);
        setProfessions(profData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleCarreraChange = (e) => {
    const { name, value } = e.target;
    setNewCarrera({ ...newCarrera, [name]: value });
  };

  const GuardarCarrera = (e) => {
    e.preventDefault();
    const carreraConNumeros = {
      ...newCarrera,
      idProfessional: parseInt(newCarrera.idProfessional, 10),
      certificadosModulares: parseInt(newCarrera.certificadosModulares, 10),
    };
    setStudentCarrera([...studentCarrera, carreraConNumeros]);
    onClose();
  };

  return (
    <div className={styleM.modalOverlay}>
      <div className={styleM.modalContent}>
        {/* Botón de cerrar */}
        <button className={styleM.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2 className={styleM.modalTitle}>Ingresar Carrera</h2>
        <form onSubmit={GuardarCarrera} className={styleM.formGrid}>
          <div className={styleM.formGroup}>
            <label>Profesión</label>
            <select
              name="idProfessional"
              value={newCarrera.idProfessional}
              onChange={handleCarreraChange}
              required
            >
              <option value="">Seleccione una profesión</option>
              {professions.map((prof) => (
                <option key={prof.id} value={Number(prof.id)}>
                  {prof.nameProfession}
                </option>
              ))}
            </select>
          </div>

          <div className={styleM.formGroup}>
            <label>Año de Ingreso</label>
            <select
              name="ageEntry"
              value={newCarrera.ageEntry}
              onChange={handleCarreraChange}
              required
            >
              <option value="">Selecciona un año</option>
              {Array.from({ length: 50 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styleM.formGroup}>
            <label>Año de Egreso</label>
            <select
              name="ageGraduation"
              value={newCarrera.ageGraduation}
              onChange={handleCarreraChange}
              required
            >
              <option value="">Selecciona un año</option>
              {Array.from({ length: 50 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styleM.formGroup}>
            <label>Observación</label>
            <input
              type="text"
              name="Observacion"
              value={newCarrera.Observacion}
              onChange={handleCarreraChange}
            />
          </div>

          <div className={styleM.formGroup}>
            <label>Certificados Modulares</label>
            <div className={styleM.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="certificadosModulares"
                  value="1"
                  checked={newCarrera.certificadosModulares === "1"}
                  onChange={handleCarreraChange}
                />
                Sí
              </label>
              <label>
                <input
                  type="radio"
                  name="certificadosModulares"
                  value="0"
                  checked={newCarrera.certificadosModulares === "0"}
                  onChange={handleCarreraChange}
                />
                No
              </label>
            </div>
          </div>

          <div className={styleM.formActions}>
            <button type="submit" className={styleM.submitBtn}>
              Guardar
            </button>
            <button type="button" className={styleM.cancelBtn} onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCarrera;
