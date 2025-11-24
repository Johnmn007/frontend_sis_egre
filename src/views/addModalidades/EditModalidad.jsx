import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getIdModalidad, updateModalidad } from "../../service/modalidades";
import style from "../../assets/css/addModalidades.module.css";

const EditModalidad = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [descrition, setDescrition] = useState("");

  // 🔹 Cargar la modalidad existente
  useEffect(() => {
    const fetchModalidad = async () => {
      try {
        const response = await getIdModalidad(id);
        if (response && response.descrition) {
          setDescrition(response.descrition);
        } else {
          Swal.fire("Error", "No se encontró la modalidad", "error");
          navigate("/modalidades/Modalidades");
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo obtener la modalidad", "error");
        console.error("Error al obtener modalidad:", error);
      }
    };
    fetchModalidad();
  }, [id, navigate]);

  // 🔹 Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descrition.trim()) {
      Swal.fire("Error", "La descripción de la modalidad es obligatoria", "error");
      return;
    }

    try {
      await updateModalidad(id, { descrition });
      Swal.fire("Éxito", "Modalidad actualizada correctamente", "success");
      navigate("/modalidades/Modalidades");
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la modalidad", "error");
      console.error("Error al actualizar modalidad:", error);
    }
  };

  return (
    <div className={style.centerContainer}>
      <h2 className={style.title}>Editar Modalidad</h2>

      <form onSubmit={handleSubmit} className={style.formContainer}>
        <div className={style.formGroup}>
          <label>Descripción de la Modalidad:</label>
          <input
            type="text"
            value={descrition}
            onChange={(e) => setDescrition(e.target.value)}
            className={style.inputField}
            placeholder="Ej: Presencial, Virtual, Semi-presencial"
          />
        </div>

        <button type="submit" className={style.addButton}>
          Guardar Cambios
        </button>
        <button
          type="button"
          className={style.cancelButton}
          onClick={() => navigate("/modalidades/Modalidades")}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditModalidad;
