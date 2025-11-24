import style from "./Footer.module.css";
import { FaUniversity } from "react-icons/fa";

export default function Footer() {
  return (
    
        <footer className={style.footer}>
      {/* Icono y texto */}
      <div className={style["footer-content"]}>
        <FaUniversity className={style.icon} />
        <p>© 2025 IETSP SUIZA - Todos los derechos reservados</p>
        <img
          src="/img/Logo-suiza.png"
          alt="Logo IETSP SUIZA"
          className={style.logo}
        />
      </div>
    </footer>
  );
}
