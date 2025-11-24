import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { getTitleGraduate } from "../../../service/Titulados";
import Swal from "sweetalert2";
import style from "./AddTitle.module.css";

const AddTitle = ({ idGraduate }) => {
  const [hasTitle, setHasTitle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const data = await getTitleGraduate(idGraduate);
        setHasTitle(data.length > 0);
      } catch (error) {
        console.error("Error al verificar títulos:", error);
      }
    };

    if (idGraduate) fetchTitle();
  }, [idGraduate]);

  const handleClick = () => {
    if (hasTitle) {
      Swal.fire({
        icon: "warning",
        title: "Este egresado ya tiene un título registrado",
        text: "No puedes registrar más de un título.",
        confirmButtonText: "Entendido",
      });
      return;
    }
    navigate(`/TitlesAdd/${idGraduate}`);
  };

  return (
    <button onClick={handleClick} className={style.addBtn}>
      <FaGraduationCap size={18} />
     
    </button>
  );
};

export default AddTitle;
