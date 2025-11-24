import React, { useState } from "react"; 
import Navigation from "./Navigation";
import style from "../assets/css/index.module.css";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import Swal from "sweetalert2";


const Index = ({ Content }) => {
  const [isOpen, setIsOpen] = useState(true); // Abierto por defecto
  const handleLogout = () => {
    Swal.fire({
      title: "¿Deseas cerrar sesión?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  };
  return (
    
    <div className={style.pageContainer}>
      {/* Menú lateral */}
      <div className={isOpen ? style.menu : style.menuChico}>
        <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>

      {/* Contenedor principal que se ajusta al tamaño del menú */}
      <div className={style.section}>
        <div className={style.header}>
          <Header isOpen={isOpen} setIsOpen={setIsOpen} onLogout={handleLogout}/>
        </div>
        <div className={style.content}>
          <Content />
        </div>
        <div className={style.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
