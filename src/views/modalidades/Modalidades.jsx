import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Swal from "sweetalert2";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { getModalidad, deleteModalidad } from "../../service/modalidades";
import style from "../../assets/css/Modalidades.module.css";


const Modalidades = () => {
  const [modalidades, setModalidad] = useState([]);

  // 🔄 Cargar datos iniciales
  useEffect(() => {
    const fetchModalidad = async () => {
      try {
        const data = await getModalidad();
        setModalidad(data);
      } catch (error) {
        console.error("Error al obtener modalidades:", error);
      }
    };
    fetchModalidad();
  }, []);

  // 🚀 Función para eliminar una modalidad
  const handleDelete = async (id) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    });

    if (confirmDelete.isConfirmed) {
      try {
        await deleteModalidad(id);
        Swal.fire("Eliminado", "La modalidad ha sido eliminada", "success");

        // 🔄 Actualizar lista sin recargar
        const updatedData = await getModalidad();
        setModalidad(updatedData);
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la modalidad", "error");
        console.error("Error al eliminar modalidad:", error);
      }
    }
  };

  return (
    <div>
      <div className={style.centerContainer}>
        <h2 className={style.title}>MODALIDADES</h2>
        <Link className={style.addButton} to="/addModalidades/addModalidades">
          Registrar Modalidades
        </Link>
        <div className={style.tableContainer}>
          <table className={`${style.table} table table-striped table-bordered`}>
            <thead className={style.tableHeader}>
              <tr>
                <th>#</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {modalidades.map((modalidad, index) => (
                <tr key={modalidad.id}>
                  <td>{index + 1}</td>
                  <td>{modalidad.descrition}</td>
                  <td>
                    <Link
                      className={style.actionButton}
                      to={`/modalidades/edit/${modalidad.id}`}
                      title="Editar"
                    >
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      className={style.deleteButton}
                      onClick={() => handleDelete(modalidad.id)}
                      title="Eliminar"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {modalidades.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">
                    No hay modalidades registradas
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modalidades;
