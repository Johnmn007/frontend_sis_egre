import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Registrar los módulos de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ dataProfessions }) => {
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
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Titulados",
        data: dataTitulados,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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

  return <Bar data={data} options={options} />;
};

export default BarChart;
