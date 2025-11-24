import React, { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../context/Context";
import { getLogin ,deleteLogin  } from "../../service/Login";

import "@fortawesome/fontawesome-free/css/all.min.css";
import style from "../../assets/css/Modalidades.module.css";
import Swal from "sweetalert2";

const ListUsuarios=()=>{
    const { state } = useContext(DataContext);
    const { rol } = state;
    const [login, setLogin] = useState([]);

    useEffect(() => {
        const fetchUser= async () => {
          try {
            const data = await getLogin();
            const enrichedData = data.map((user) => {
                const userRol = rol.find((r) => r.id === user.idRol);
                return {
                    ...user,
                    DescritionRol: userRol ? userRol.Descrition : "Sin rol",
                };
            });
            setLogin(enrichedData);
          } catch (error) {
            console.error("Error al obtener usuarios:", error);
          }
        };
        fetchUser();
      }, [rol]);
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
            await deleteLogin(id);
            Swal.fire("Eliminado", "El usuario ha sido eliminada", "success");
    
            // 🔄 Actualizar lista sin recargar
            const updatedData = await getLogin();
            setLogin(updatedData);
          } catch (error) {
            Swal.fire("Error", "No se pudo eliminar el usuario", "error");
            console.error("Error al eliminar usuario:", error);
          }
        }
    };

    return(
        <div>
              <div className={style.centerContainer}>
                <h2 className={style.title}>USUARIOS</h2>
                <Link className={style.addButton} to="/Administrador/usuarioAdd">
                  Registrar Nuevo usuario
                </Link>
                <div className={style.tableContainer}>
                  <table className={`${style.table} table table-striped table-bordered`}>
                    <thead className={style.tableHeader}>
                      <tr>
                        <th>#</th>
                        <th>Rol</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {login.map((user, index) => (
                        <tr key={user.id}>
                          <td>{index + 1}</td>
                          <td>{user.DescritionRol}</td>
                          <td>{user.usuario}</td>
                          <td>
                            <Link
                                className={style.actionButton}
                                to={`/Administrador/userEdit/${user.id}`} // ✅ Importante la barra inicial
                                title="Editar"
                                >
                                <i className="fas fa-edit"></i>
                                </Link>
                            <button
                              className={style.deleteButton}
                              onClick={() => handleDelete(user.id)}
                              title="Eliminar"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {login.length === 0 && (
                        <tr>
                          <td colSpan="3" className="text-center">
                            No hay usuarios registrados
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

export default ListUsuarios;