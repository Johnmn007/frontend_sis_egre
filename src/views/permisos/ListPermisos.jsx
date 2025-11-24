import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getPermisos } from "../../service/Permisos";
import "@fortawesome/fontawesome-free/css/all.min.css";
import style from "../../assets/css/Modalidades.module.css";


const ListPermisos=()=>{
    
    const [permisos, setPermisos] = useState([]);

    useEffect(() => {
        const fetchUser= async () => {
          try {
            const data = await getPermisos();
            
            setPermisos(data);
          } catch (error) {
            console.error("Error al obtener usuarios:", error);
          }
        };
        fetchUser();
      }, []);
    

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
                        
                        <th>Rol</th>
                        <th>Agregar</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                      </tr>
                    </thead>
                    <tbody>
                      {permisos.map((r, index) => (
                        <tr key={r.id}>
                          <td>{index + 1}</td>
                          
                          <td>{r.idRol}</td>
                          <td>{r.insertPer}</td>
                          <td>{r.updatePer}</td>
                          <td>{r.deletePer}</td>

                          <td>
                            <Link
                                className={style.actionButton}
                                to={`/Administrador/EditPermisos/${r.id}`} 
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
                      {permisos.length === 0 && (
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

export default ListPermisos;