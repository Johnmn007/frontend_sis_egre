import React from "react";

import Poblacion from "../components/Graficos/Poblacion";
import SoloEgresados from "../components/Graficos/SoloEgresados";
import style from "../assets/css/Graficos.module.css";
import SoloTitulados from "../components/Graficos/SoloEgresadosTitulados";
import PorProfeccion from "../components/Graficos/PorProfeccion";
import PorAño from "../components/Graficos/EgresadosPorAño";


const Graficos = () => {
  return (
    
      
  
      <div className={style.container}>  
      
        <div className={style.conntenPoblacion}>
          <Poblacion />
        </div>
        <div className={style.section}>
          <SoloEgresados />
          <SoloTitulados />
        </div>
        <br />
        <div className={style.section}>
          <PorProfeccion />
          <PorAño />
        </div>
        
        
       
      </div>  
    
  );
};

export default Graficos;
