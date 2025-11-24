import React, { useContext, useState } from "react";
import { Users, BookOpen } from "lucide-react";
import { DataContext } from "../context/Context";
import Card from "../components/dashboard/Card";
import { useNavigate } from "react-router-dom"; // ✅ importa navigate
import BarChart from "../components/dashboard/GraficoBarra";
import LineChart from "../components/dashboard/GraficoLinea";
import Cuadro from "../components/dashboard/Cuadro";
import style from "../assets/css/dashboard/Dashboard.module.css";

const Dashboard = () => {
  const { state } = useContext(DataContext);
  const { countProfessions,studentsCount } = state;

  // ✅ hook para navegación
  const navigate = useNavigate();
  
  // Estado para controlar "ver más"
  const [showAll, setShowAll] = useState(false);

  // Mostrar solo las primeras 4 carreras si no está activado "ver más"
  const displayedProfessions = showAll
    ? countProfessions
    : countProfessions.slice(0, 4);

  return (
    <div className={style.container}>
      <h1 className={style.title}>Panel de Control</h1>

      {/* 🔹 Carreras */}
      <div className={style.grid}>
        {displayedProfessions.map((item) => (
          <Card
            key={item.id}
            title={item.nameProfession}
            value={item.countGraduate}
            valueTitle={item.countTitulado}
            id={item.id}
          />
        ))}
      </div>

      {/* 🔹 Botón Ver más / Ver menos */}
      {countProfessions.length > 4 && (
        <div className={style.btnContainer}>
          <button
            className={style.btnMore}
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "Ver menos" : "Ver más carreras"}
          </button>
        </div>
      )}

      {/* 🔹 Tarjetas adicionales */}
      <div className={style.grid}>
        <div className={`${style.card} ${style.blueCard}`}>
          <Users className={style.cardIcon} />
          <div>
            <p className={style.cardText}>Estudiantes</p>
            <h2 className={style.cardValue}>{studentsCount}</h2>
          </div>
        </div>

        {/* ✅ Ahora abre en la misma ventana */}
        <div
          className={`${style.card} ${style.greenCard}`}
          onClick={() => navigate("/TecProfession")}
          style={{ cursor: "pointer" }}
        >
          <BookOpen className={style.cardIcon} />
          <div>
            <p className={style.cardText}>Cursos</p>
            <h2 className={style.cardValue}>{countProfessions.length}</h2>
          </div>
        </div>
        
        
      </div>
          {/* 🔹 Gráficos */} 
      <div className={style.chartsGrid}>
        <div className={style.chartCard}>
          <BarChart dataProfessions={countProfessions} />
        </div>
        <div className={style.chartCard}>
          <LineChart dataProfessions={countProfessions} />
        </div>
      </div>

      {/* 🔹 Cuadro */}
      <Cuadro dataProfessions={countProfessions}/>

    </div>
  );
};

export default Dashboard;
