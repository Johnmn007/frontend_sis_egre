import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Registrar módulos necesarios para el gráfico de líneas
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ dataProfessions }) => {
  // Extraer nombres y valores
  const labels = dataProfessions.map((item) => item.nameProfession);
  const dataGraduados = dataProfessions.map((item) => item.countGraduate);
  const dataTitulados = dataProfessions.map((item) => item.countTitulado);

  const data = {
    labels,
    datasets: [
      {
        label: "Graduados",
        data: dataGraduados,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.3)",
        tension: 0.3, // suaviza la línea
        fill: true,
      },
      {
        label: "Titulados",
        data: dataTitulados,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.3)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Graduados y Titulados por Carrera",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default LineChart;
