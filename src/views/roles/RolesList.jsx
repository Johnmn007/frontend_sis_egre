import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getRol   } from "../../service/Rol";

import "@fortawesome/fontawesome-free/css/all.min.css";
import style from "../../assets/css/Modalidades.module.css";


const ListRol=()=>{
    
    const [rol, setRol] = useState([]);

    useEffect(() => {
        const fetchUser= async () => {
          try {
            const data = await getRol();
            
            setRol(data);
          } catch (error) {
            console.error("Error al obtener usuarios:", error);
          }
        };
        fetchUser();
      }, []);
    // 🚀 Función para eliminar una modalidad
    // const handleDelete = async (id) => {
    //     const confirmDelete = await Swal.fire({
    //       title: "¿Estás seguro?",
    //       text: "Esta acción no se puede deshacer",
    //       icon: "warning",
    //       showCancelButton: true,
    //       confirmButtonColor: "#d33",
    //       cancelButtonColor: "#3085d6",
    //       confirmButtonText: "Sí, eliminar",
    //     });
    
    //     if (confirmDelete.isConfirmed) {
    //       try {
    //         await deleteRol(id);
    //         Swal.fire("Eliminado", "El usuario ha sido eliminada", "success");
    
    //         // 🔄 Actualizar lista sin recargar
    //         const updatedData = await getRol();
    //         setRol(updatedData);
    //       } catch (error) {
    //         Swal.fire("Error", "No se pudo eliminar el usuario", "error");
    //         console.error("Error al eliminar usuario:", error);
    //       }
    //     }
    // };

    return(
        <div>
              <div className={style.centerContainer}>
                <h2 className={style.title}>ROL</h2>
                {/* <Link className={style.addButton} to="/Administrador/usuarioAdd">
                  Registrar Nuevo usuario
                </Link> */}
                <div className={style.tableContainer}>
                  <table className={`${style.table} table table-striped table-bordered`}>
                    <thead className={style.tableHeader}>
                      <tr>
                        <th>#</th>
                        
                        <th>Usuario</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rol.map((r, index) => (
                        <tr key={r.id}>
                          <td>{index + 1}</td>
                          
                          <td>{r.Descrition}</td>
                          <td>
                            <Link
                                className={style.actionButton}
                                to={`/Administrador/rolEdit/${r.id}`} // ✅ Importante la barra inicial
                                title="Editar"
                                >
                                <i className="fas fa-edit"></i>
                                </Link>
                            {/* <button
                              className={style.deleteButton}
                              onClick={() => handleDelete(r.id)}
                            >
                              <i className="fas fa-trash"></i>
                            </button> */}
                          </td>
                        </tr>
                      ))}
                      {rol.length === 0 && (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No hay roles registrados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
    )

}

export default ListRol;