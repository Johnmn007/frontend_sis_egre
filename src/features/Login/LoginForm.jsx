import { useState, useContext } from "react";
import styles from "../../assets/css/Login.module.css";

import InputField from "./InputField";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { getUserValidate } from "../../service/Login";
import { getIdRol } from "../../service/Rol";
import { DataContext, SET_COUNT_PROFESSIONS } from "../../context/Context";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

function LoginForm() {
  const { state, dispatch } = useContext(DataContext);
  const { rol } = state;

  const navigate = useNavigate();
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rolSeleccionado, setRolSeleccionado] = useState("");

  const handleLogin = async () => {
    if (!usuario.trim() || !contraseña.trim() || rolSeleccionado === "") {
      Swal.fire("Error", "Todos los campos son obligatorios", "warning");
      return;
    }

    try {
      const response = await getUserValidate(usuario, contraseña, rolSeleccionado);
      const { token, loginUser } = response;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(loginUser));
      const rolData = await getIdRol(loginUser.idRol);
      localStorage.setItem("rol", JSON.stringify(rolData.Descrition));
      
      
      const authConfig = { headers: { Authorization: `Bearer ${token}` } };

      // 🔹 Cargar countProfessions inmediatamente
      const countRes = await axios.get(`${apiUrl}/StudentGraduate/countProfecional`, authConfig);
      dispatch({ type: SET_COUNT_PROFESSIONS, payload: countRes.data });

      Swal.fire("Éxito", "Inicio de sesión exitoso", "success");
      navigate("/Home");
    } catch (error) {
      const message = error.response?.data?.error || "Fallo de autenticación";
      Swal.fire("Error", message, "error");
      setContraseña("");
    }
  };

  return (
    <>
      <InputField
        label="Usuario"
        type="text"
        name="username"
        placeholder="Ingresar usuario"
        id="username"
        value={usuario}
        onChange={(e) => setUsuario(e.target.value)}
      />
      <InputField
        label="Contraseña"
        type="password"
        name="password"
        placeholder="Ingresar contraseña"
        id="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
      />

      <select
        className={styles.selectRol}
        value={rolSeleccionado}
        onChange={(e) => setRolSeleccionado(Number(e.target.value))}
      >
        <option value="">Seleccionar Rol</option>
        {rol.map((role) => (
          <option key={role.id} value={role.id}>
            {role.Descrition}
          </option>
        ))}
      </select>

      <button className={styles.loginButton} onClick={handleLogin}>
        Ingresar
      </button>
    </>
  );
}

export default LoginForm;
