import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTecProf, deleteTecProf } from "../service/tecProfessional";
import Swal from "sweetalert2";
import style from "../assets/css/TecProfession.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";


const TecProfession = () => {
  const [tecProfessions, setTecProfessions] = useState([]);

  // 🔄 Cargar datos iniciales
  useEffect(() => {
    const fetchProfessions = async () => {
      try {
        const data = await getTecProf();
        setTecProfessions(data);
      } catch (error) {
        console.error("Error al obtener profesiones:", error);
      }
    };
    fetchProfessions();
  }, []);

  // 🚀 Función para eliminar una carrera
  const deleteProfession = async (id) => {
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
        await deleteTecProf(id);
        Swal.fire("Eliminado", "La carrera ha sido eliminada", "success");

        // 🔄 Actualizar lista sin recargar la página
        const updatedData = await getTecProf();
        setTecProfessions(updatedData);
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar la carrera", "error");
        console.error("Error al eliminar la profesión:", error);
      }
    }
  };

  return (
    <div>
      <div className={style.centerContainer}>
        <h2 className={style.title}>PROFESIONES TECNICAS</h2>
        <Link className={style.addButton} to="/AddProfession/addProfession">
            Registrar Carrera Tecnica 
        </Link>

        <div className={style.tableContainer}>
          <table className={`${style.table} table table-striped table-bordered`}>
            <thead className={style.tableHeader}>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tecProfessions.map((titulo, index) => (
                <tr key={titulo.id}>
                  <td>{index + 1}</td>
                  <td>{titulo.nameProfession}</td>
                  <td>
                    <Link className={style.actionButton} to={`/TecProfession/editProfession/${titulo.id}`} title="Editar">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button className={style.deleteButton} onClick={() => deleteProfession(titulo.id)} title="Eliminar">
                      <i className="fas fa-trash"></i>
                    </button>
                    <Link>
                    
                    </Link>
                  </td>
                </tr>
              ))}
              {tecProfessions.length === 0 && (
                <tr>
                  <td colSpan="3" className="text-center">No hay carreras registradas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TecProfession;
