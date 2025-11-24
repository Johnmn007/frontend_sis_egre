import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { postModalidad } from "../../service/modalidades"; // ✅ Servicio para crear modalidad
import style from "../../assets/css/addModalidades.module.css"; // ✅ CSS propio

const AddModalidades = () => {
  const [descrition, setDescrition] = useState(""); // 👈 campo de la BD
  const navigate = useNavigate();
    
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!descrition.trim()) {
      Swal.fire("Error", "La descripción de la modalidad es obligatoria", "error");
      return;
    }

    try {
      await postModalidad({ descrition }); // ✅ usamos el servicio
      Swal.fire("Éxito", "Modalidad agregada correctamente", "success");
      navigate("/modalidades/Modalidades"); // ✅ redirección a la lista
    } catch (error) {
      Swal.fire("Error", "No se pudo agregar la modalidad", "error");
      console.error("Error al agregar modalidad:", error);
    }
  };

  return (
    <div className={style.centerContainer}>
      <h2 className={style.title}>Agregar Modalidad</h2>
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
          Guardar
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

export default AddModalidades;
