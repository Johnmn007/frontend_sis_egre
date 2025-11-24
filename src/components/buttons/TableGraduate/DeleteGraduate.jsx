import React,{useContext} from "react";
import { FaTrash } from "react-icons/fa";
import { deleteEgresados } from "../../../service/Egresados";
import { DataContext } from "../../../context/Context";
import { updateCountStudents } from "../../../service/Count";
import Swal from "sweetalert2";
import styles from "./DeleteGraduate.module.css"; // ✅ importa como styles

const DeleteGraduate = ({ id, onDeleted }) => {
  const { dispatch } = useContext(DataContext);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarlo",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteEgresados(id);

        Swal.fire("¡Eliminado!", "El egresado ha sido eliminado.", "success");

        await updateCountStudents(dispatch);

        if (onDeleted) onDeleted(); // 🔥 refresca la lista
      } catch (error) {
        Swal.fire(
          "Error",
          error.response?.data?.message || "No se pudo eliminar el egresado",
          "error"
        );
      }
    }
  };

  return (
   <center> 
    <button onClick={handleDelete} className={styles.deleteBtn}>
  <FaTrash size={20} />
</button>
</center>
  );
};

export default DeleteGraduate;
