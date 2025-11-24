import React from "react";
import egresadoImage from "../assets/css/img/Vision.png";
import style from "../assets/css/Card.module.css";

export const Card = ({ flipped, setFlipped }) => {
  return (
    <div className={style.container} onClick={() => setFlipped(!flipped)}>
      <div className={`${style.card} ${flipped ? style.flipped : ""}`}>
        <div className={`${style.cardSide} ${style.front}`}>
          <img src={egresadoImage} alt="Egresado" className={style.rotatingImage} />
        </div>
        <div className={`${style.cardSide} ${style.back}`}>
          <div className={style.overlay}></div>
          <h4>Institución líder con excelente servicio educativo en la formación de profesionales técnicos competitivos, capacidad empresarial, creativa para generar autoempleo, desarrollar proyectos que transformen la realidad socio económico-cultural y preservar el medio ambiente para el desarrollo sostenible de la región y del país.</h4>
          <ul className={style.list}>
          </ul>
        </div>
      </div>
    </div>
  );
};
