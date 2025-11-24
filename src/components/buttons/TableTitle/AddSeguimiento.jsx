import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFileSignature } from "react-icons/fa"; // 🔹 Ícono tipo CV
import { getSeguimientoIdTitle } from "../../../service/SeguimientoLaboral";
import Swal from "sweetalert2";

const AddSeguimiento = ({ idTitle }) => {
  const [hasTitle, setHasTitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const data = await getSeguimientoIdTitle(idTitle);
        
        setHasTitle(!!data && !!data.id);
      } catch (error) {
        console.error("Error al verificar títulos:", error);
      }
    };

    if (idTitle) fetchTitle();
  }, [idTitle]);

  const handleClick = () => {
    if (hasTitle) {
      Swal.fire({
        icon: "warning",
        title: "Ya tiene Seguimiento laboral",
        text: "No puedes registrar más de un registro.",
        confirmButtonText: "Entendido",
      });
      return;
    }
    navigate(`/SeguimientoAdd/${idTitle}`);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 14px",
        backgroundColor: "#0f0cebff",
        color: "white",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s ease",
      }}
      title="Agregar Seguimiento Laboral (CV)"
      onMouseEnter={(e) => (e.target.style.backgroundColor = "#2623f0")}
      onMouseLeave={(e) => (e.target.style.backgroundColor = "#0f0cebff")}
    >
      <FaFileSignature size={20} />
    </button>
  );
};

export default AddSeguimiento;
