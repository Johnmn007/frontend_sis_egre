import React from "react";
import style from "./Header.module.css";
import { FaBars, FaTimes, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";

export default function Header({ isOpen, setIsOpen, onLogout }) {
  return (
    <header className={style.header}>
      {/* Botón alineado a la izquierda */}
      <button className={style.menuButton} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Contenido centrado */}
      <div className={style.headerContent}>
        <FaUserGraduate className={style.icon} />
        <h4>Sistema de Control de Egresados y Titulados</h4>
        <img
          src="/img/Logo-suiza.png"
          alt="Logo IETSP SUIZA"
          className={style.logo}
        />
      </div>

      {/* Botón de cierre de sesión (alineado a la derecha) */}
      <button className={style.logoutButton} onClick={onLogout}>CERRAR SESION
        <FaSignOutAlt /> 
      </button>
    </header>
  );
}
