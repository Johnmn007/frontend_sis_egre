import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getIdEgresados, updateEgresados } from "../../service/Egresados"; 
import { getTecProf } from "../../service/tecProfessional";
import Swal from "sweetalert2";
import styles from "./EditGraduate2.module.css"; // ✅ importa como styles

const EditGraduate2 = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [egresado, setEgresado] = useState(null);
  const [professions, setProfessions] = useState([]);

  const [EditCarrera, setEditCarrera] = useState({
    idProfessional: "",
    ageEntry: "",
    ageGraduation: "",
    Observacion: "",
    certificadosModulares: "0",
  });

  // Cargar datos del egresado
  useEffect(() => {
    const fetchEgresado = async () => {
      try {
        const data = await getIdEgresados(id);
        setEgresado(data);

        // Precargar datos en el formulario
        setEditCarrera({
          idProfessional: data.idProfessional || "",
          ageEntry: data.ageEntry || "",
          ageGraduation: data.ageGraduation || "",
          Observacion: data.Observacion || "",
          certificadosModulares: data.certificadosModulares?.toString() || "0",
        });
      } catch (error) {
        console.error("Error fetching graduate data:", error);
      }
    };
    fetchEgresado();
  }, [id]);

  // Cargar lista de profesiones
  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const data = await getTecProf();
        setProfessions(data);
      } catch (error) {
        console.error("Error fetching professions:", error);
      }
    };
    fetchProfessions();
  }, []);

  const handleCarreraChange = (e) => {
    const { name, value } = e.target;
    setEditCarrera((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const GuardarCarrera = async (e) => {
    e.preventDefault();
    try {
        await updateEgresados(id, EditCarrera); // 🔹 deberías tener este servicio en tu backend
        // alert("Datos actualizados correctamente ✅");
        Swal.fire("Éxito", "Datos actualizados correctamente ✅", "success");
        navigate(-1); // vuelve atrás
    } catch (error) {
        console.error("Error actualizando datos:", error);
        // alert("Hubo un error al actualizar ❌");
        Swal.fire("Error", "Hubo un error al actualizar ❌", "error");
    }
  };

  if (!egresado) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className={styles.container}>
    <h2 className={styles.title}>Editar Graduado</h2>
    <form onSubmit={GuardarCarrera}>
      <div className={styles.formGroup}>
        <label className={styles.label}>Profesión</label>
        <select
          name="idProfessional"
          value={EditCarrera.idProfessional}
          onChange={handleCarreraChange}
          className={styles.select}
          required
        >
          <option value="">Seleccione una profesión</option>
          {professions.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.nameProfession}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Año de Ingreso</label>
        <select
          name="ageEntry"
          value={EditCarrera.ageEntry}
          onChange={handleCarreraChange}
          className={styles.select}
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

      <div className={styles.formGroup}>
        <label className={styles.label}>Año de Egreso</label>
        <select
          name="ageGraduation"
          value={EditCarrera.ageGraduation}
          onChange={handleCarreraChange}
          className={styles.select}
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

      <div className={styles.formGroup}>
        <label className={styles.label}>Observación</label>
        <input
          type="text"
          name="Observacion"
          value={EditCarrera.Observacion}
          onChange={handleCarreraChange}
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Certificados Modulares</label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="certificadosModulares"
              value="1"
              checked={EditCarrera.certificadosModulares === "1"}
              onChange={handleCarreraChange}
            />
            Sí
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="certificadosModulares"
              value="0"
              checked={EditCarrera.certificadosModulares === "0"}
              onChange={handleCarreraChange}
            />
            No
          </label>
        </div>
      </div>

      <div className={styles.btnGroup}>
        <button type="submit" className={`${styles.btn} ${styles.btnSave}`}>
          Guardar
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`${styles.btn} ${styles.btnCancel}`}
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
  );
};

export default EditGraduate2;
