import React from "react";
import egresadoImage2 from "../assets/css/img/Mision.png";
import style from "../assets/css/Card2.module.css";

export const Card2 = ({ flipped2, setFlipped2 }) => {
  return (
    <div className={style.container2} onClick={() => setFlipped2(!flipped2)}>
      <div className={`${style.card2} ${flipped2 ? style.flipped2 : ""}`}>
        {/* Lado frontal */}
        <div className={`${style.card2Side} ${style.front2}`}>
          <img src={egresadoImage2} alt="Egresado" className={style.rotatingImage2} />
        </div>

        {/* Lado posterior */}
        <div className={`${style.card2Side} ${style.back2}`}>
          <div className={style.overlay2}></div>
         <h4>Formar profesionales técnicos con valores, emprendedores, proactivos, creativos, productivos; comprometidos con la conservación de la biodiversidad para el desarrollo sostenible de la región y del país.</h4>
          <ul className={style.list}>
            
          </ul>
        </div>
      </div>
    </div>
  );
};
