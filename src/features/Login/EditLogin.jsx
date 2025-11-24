import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../../context/Context";
import styles from "../Login/EditLogin.module.css"; // 🔹 usando el mismo css

import InputField from "./InputField";
import { getIdLogin, updateLogin } from "../../service/Login";
import Swal from "sweetalert2";

// 🔹 importa tu logo
 import logo from "../../assets/css/img/2.png";// ajusta la ruta según tu proyecto


function EditUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useContext(DataContext);
  const { rol } = state;

  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [responsable, setResponsable] = useState("");
  const [idRol, setIdRol] = useState("");

  // ✅ Cargar usuario existente
  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const user = await getIdLogin(id);
          setUsuario(user.usuario || "");
          setResponsable(user.responsable || "");
          setIdRol(user.idRol?.toString() || "");
        } catch (error) {
          console.error("Error al obtener usuario:", error);
          Swal.fire("Error", "No se pudo cargar el usuario", "error");
          navigate("/Administrador/usuario");
        }
      };
      fetchUser();
    }
  }, [id, navigate]);

  // ✅ Actualizar usuario
  const handleUpdate = async () => {
    if (!usuario.trim() || !responsable.trim() || !idRol) {
      Swal.fire("Error", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      await updateLogin(id, {
        usuario: usuario.trim(),
        responsable: responsable.trim(),
        idRol: parseInt(idRol, 10),
        ...(contraseña ? { contraseña: contraseña.trim() } : {}),
      });

      Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      navigate("/Administrador/userList");
    } catch (error) {
      const mensajeError =
        error.response?.data?.message || "Error al actualizar usuario";
      Swal.fire("Error", mensajeError, "error");
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* 🔹 Logo arriba centrado */}
      <img src={logo} alt="logo" className={styles.logo} />

      <h2 className={styles.title}>Editar Usuario</h2>

      <InputField
        label="Usuario"
        type="text"
        placeholder="Ingresar usuario"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />

      <InputField
        label="Nueva Contraseña (opcional)"
        type="password"
        placeholder="Dejar en blanco si no deseas cambiar"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />

      <InputField
        label="Responsable"
        type="text"
        placeholder="Nombre completo"
        value={responsable}
        onChange={(e) => setResponsable(e.target.value)}
      />

      <select
        className={styles.selectRol}
        value={idRol}
        onChange={(e) => setIdRol(e.target.value)}
      >
        <option value="">Seleccionar Rol</option>
        {rol.map((role) => (
          <option key={role.id} value={role.id}>
            {role.Descrition}
          </option>
        ))}
      </select>

      <button className={styles.loginButton} onClick={handleUpdate}>
        Actualizar
      </button>
    </div>
  );
}

export default EditUser;
