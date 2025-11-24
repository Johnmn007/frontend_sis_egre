import { useState } from "react";
import styles from "../assets/css/Login.module.css";

import LoginForm from "../features/Login/LoginForm";
//import RegisterForm from "../features/Login/RegisterForm";


// Componente principal que exportamos
export default function LoginPage() {
  
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Izquierda - Imagen */}
        <div className={styles.imageContainer}>
          <div className={styles.imageBox}>
            <img
              className={styles.imageIcon}
              src="/img/Logo-suiza.png"
              alt="Logo Suiza"
            />
          </div>
        </div>

        {/* Derecha - Formulario */}
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Iniciar Sesión</h2>
          <LoginForm  />
            
        </div>
      </div>
    </div>
  );
}
