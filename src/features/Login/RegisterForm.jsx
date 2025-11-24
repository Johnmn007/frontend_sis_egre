import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Login/RegisterForm.module.css";
import InputField from "./InputField";
import { getLoginUser, postLogin } from "../../service/Login";
import { DataContext } from "../../context/Context";
import Swal from "sweetalert2";
import logo from "../../assets/css/img/2.png";


function RegisterForm() {
  const { state } = useContext(DataContext);
  const { rol } = state;
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [responable, setResponable] = useState("");
  const [idRol, setIdRol] = useState("");
  const [confirmarContraseña, setConfirmarContraseña] = useState("");

  const handleRegister = async () => {
    if (!usuario.trim() || !contraseña.trim() || !confirmarContraseña.trim()) {
      Swal.fire("Error", "Todos los campos son obligatorios", "warning");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      Swal.fire("Error", "Las contraseñas no coinciden", "error");
      setContraseña("");
      setConfirmarContraseña("");
      return;
    }

    try {
      const validateUser = await getLoginUser(usuario);
      if (validateUser) {
        Swal.fire("Error", "Este usuario ya existe", "error");
        setUsuario("");
        setContraseña("");
        setConfirmarContraseña("");
        return;
      }

      await postLogin({
        usuario: usuario,
        contraseña: contraseña,
        responsable: responable,
        idRol: parseInt(idRol, 10),
      });

      Swal.fire("Éxito", "Usuario registrado correctamente", "success");
      navigate("/Administrador/userList");
    } catch (error) {
      const mensajeError = error.response?.data?.message || "Error al registrar usuario";
      console.error("Error al registrar:", mensajeError);
      Swal.fire("Error", mensajeError, "error");
    }
  };

  return (
    <div className={styles.formContainer}>
      {/* Logo Institución */}
      <img src={logo} alt="Logo Institución" className={`${styles.logo} ${styles.animate3d}`} />

      <h2 className={styles.formTitle}>Registro de Usuario</h2>

      <InputField
        label="Nuevo Usuario"
        type="text"
        placeholder="Ingresar usuario"
        id="new-username"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <InputField
        label="Contraseña"
        type="password"
        placeholder="Contraseña"
        id="new-password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />
      <InputField
        label="Confirmar contraseña"
        type="password"
        placeholder="Confirmar contraseña"
        id="confirm-password"
        value={confirmarContraseña}
        onChange={(e) => setConfirmarContraseña(e.target.value)}
      />
      <InputField
        label="Responsable"
        type="text"
        placeholder="Nombre completo"
        id="new-responsable"
        value={responable}
        onChange={(e) => setResponable(e.target.value)}
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

      <button
        className={styles.loginButton}
        onClick={handleRegister}
        disabled={!usuario || !contraseña || !confirmarContraseña || !idRol}
      >
        Registrar
      </button>
    </div>
  );
}

export default RegisterForm;
