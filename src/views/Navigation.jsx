import React, { useState } from "react";
import { Link } from "react-router-dom";

import { 
  FaHome, 
  FaUserGraduate, 
  FaUserPlus,
  FaUser,
  FaBook, 
  FaCogs, 
  FaChartBar, 
  FaWrench, 
  FaListAlt, 
  FaLock 
} from "react-icons/fa";

import style from "../assets/css/Navigation.module.css";

const Navigation = ({ isOpen, setIsOpen }) => {
  const [adminOpen, setAdminOpen] = useState(false);
  const rol = localStorage.getItem("rol");
  return (
    <nav className={`${style.nav} ${isOpen ? style.open : style.collapsed}`}>
      <div className={style.linksContainer}>
        <Link to="/Home" className={style.link} onClick={() => setIsOpen(true)}>
          <FaHome className={style.icon} /> <span className={style.text}> Home</span>
        </Link>

        <Link to="/Dashboard" className={style.link} onClick={() => setIsOpen(true)}>
          <FaCogs className={style.icon} /> <span className={style.text}> Dashboard</span>
        </Link>

        <Link to="/GraduatesAdd" className={style.link} onClick={() => setIsOpen(true)}>
          <FaUserPlus className={style.icon} /> <span className={style.text}> Agregar Estudiante</span>
        </Link>

        <Link to="/List" className={style.link} onClick={() => setIsOpen(true)}>
          <FaUserGraduate className={style.icon} /> <span className={style.text}>Buscar Estudiante</span>
        </Link>

        {/* <Link to="/Titles" className={style.link} onClick={() => setIsOpen(true)}>
          <FaUserGraduate className={style.icon} /> <span className={style.text}> Lista de Titulados</span>
        </Link>  */}
       
        

        {/* <Link to="/Graficos" className={style.link} onClick={() => setIsOpen(true)}>
          <FaChartBar className={style.icon} /> <span className={style.text}> Gráficos y Estadísticas</span>
        </Link> */}



        {/* ADMINISTRADOR CON SUBMENÚ */}
        {rol === '"ADMINISTRADOR"' && ( 
          
        
        <div className={style.dropdown}>
          <div className={style.link} onClick={() => setAdminOpen(!adminOpen)}>
            <FaWrench className={style.icon} /> <span className={style.text}>Administrador</span>
          </div>

          {adminOpen && (
            <div className={style.submenu}>
              <Link to="/TecProfession" className={style.link} onClick={() => setIsOpen(true)}>
                <FaBook className={style.icon} /> <span className={style.text}> Carreras Profesionales</span>
              </Link>
              <Link to="/modalidades/Modalidades" className={style.subLink}>
                <FaListAlt className={style.icon} /> <span className={style.text}>Modalidades</span>
              </Link>
              <Link to="/Administrador/RolesList" className={style.subLink}>
                <FaListAlt className={style.icon} /> <span className={style.text}>Roles</span>
              </Link>
             
              <Link to="/Administrador/userList" className={style.subLink}>
                <FaUser className={style.icon} /> <span className={style.text}>Usuarios</span>
              </Link>
            </div>
          )}
        </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
