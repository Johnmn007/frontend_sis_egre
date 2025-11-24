import React, { useState } from 'react';
import { Users } from "lucide-react";
import GraduateOrTitle from './GraduateOrTitle';
import style from "../../assets/css/dashboard/Cards.module.css";

const Card = ({ title, value, valueTitle, id }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={style.card} onClick={() => setShowModal(true)}>
        <div className={style.cardHeader}>
          <Users className={style.cardIcon} />
          <h2 className={style.title}>{title}</h2>
        </div>

        <div className={style.statRow}>
          <p className={style.cardText}>Estudiantes Egresados</p>
          <span className={style.cardValue}>{value}</span>
        </div>

        <div className={style.statRow}>
          <p className={style.cardText}>Estudiantes Titulados</p>
          <span className={style.cardValue}>{valueTitle}</span>
        </div>
      </div>

      {showModal && (
        <GraduateOrTitle 
          onClose={() => setShowModal(false)} 
          id={id} 
        />
      )}
    </>
  );
};

export default Card;
