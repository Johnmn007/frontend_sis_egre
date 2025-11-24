// GraduateOrTitle.jsx
import React from "react";
import { Link } from "react-router-dom";
import styleM from "../../assets/css/dashboard/Modal1.module.css";
import { User } from "lucide-react";

const GraduateOrTitle = ({ onClose, id }) => {
  return (
    <div className={styleM.modalOverlay}>
      <div className={styleM.modalContent}>
        {/* Botón de cerrar */}
        <button
          type="button"
          className={styleM.closeButton}
          onClick={() => {
            
            onClose();
          }}
        >
          &times;
        </button>

            <Link to={`/GraduateProfession/${id}`} className={styleM.linkCard}>
        <User className={styleM.cardIcon} /> Solo Egresados
      </Link>
      <Link to={`/TitlesProfession/${id}`} className={styleM.linkCard}>
        <User className={styleM.cardIcon} /> Solo Titulados
      </Link>

      </div>
    </div>
  );
};

export default GraduateOrTitle;
