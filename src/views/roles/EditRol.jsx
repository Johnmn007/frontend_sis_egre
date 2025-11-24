import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { getIdRol, updateRol } from "../../service/Rol";
import styles from "../roles/EditRol.module.css";
import logo from "../../assets/css/img/2.png"; // 🔹 cambia a tu logo real

const EditRol = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [rol, setRol] = useState({
    Descrition: "",
  });

  // Obtener datos del rol por id
  useEffect(() => {
    const fetchRol = async () => {
      try {
        const response = await getIdRol(id);
        if (response) {
          setRol({
            Descrition: response.Descrition || "",
          });
        }
      } catch (error) {
        console.error("Error obteniendo rol:", error);
        Swal.fire("Error", "No se pudo obtener los datos del rol ❌", "error");
      }
    };
    fetchRol();
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setRol({
      ...rol,
      [e.target.name]: e.target.value,
    });
  };

  // Actualizar rol
  const ActualizarRol = async (e) => {
    e.preventDefault();
    try {
      await updateRol(id, rol);
      Swal.fire("Éxito", "Datos actualizados correctamente ✅", "success");
      navigate(-1);
    } catch (error) {
      console.error("Error actualizando datos:", error);
      Swal.fire("Error", "Hubo un error al actualizar ❌", "error");
    }
  };

  return (
    <div className={styles.container}>
      {/* 🔹 Logo */}
      <div className={styles.logoContainer}>
        <img src={logo} alt="Logo" className={styles.logo} />
      </div>

      <h2>Editar Rol</h2>
      <form onSubmit={ActualizarRol}>
        <div className={styles.formGroup}>
          <label htmlFor="Description">Descripción</label>
          <input
            type="text"
            id="Descrition"
            name="Descrition"
            className={styles.input}
            value={rol.Descrition}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button type="submit" className={styles.btnPrimary}>
            Guardar cambios
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditRol;
