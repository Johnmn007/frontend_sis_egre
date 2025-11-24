import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { postSeguimiento } from "../../service/SeguimientoLaboral";
import {updateTitle ,getIdTitle } from "../../service/Titulados";

import { DataContext } from "../../context/Context";
import { updateCountStudents } from "../../service/Count";
import Swal from "sweetalert2";
import style from "../../assets/css/Title/AddTitleForm.module.css";

const AddSeguimientoForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DataContext);
  const { id } = useParams();
  const [title,setTitle]= useState({})
  
  
    const [formData, setFormData] = useState({
        typeInstitution:'Publica',
        company:'',
        position:'',
        fecha_inicio:'',    
        fecha_fin:'',
        salario_aprox:'',
        Observacion:'',
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const title = await getIdTitle(id);
        if (title) {
          setFormData((prev) => ({
            ...prev,
            idStudent: title.idStudent || "",
            idStudentTitle:id
          }));
          setTitle(title);
          
        }
        
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, [id]);

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: name === "idStudentTitle" ? Number(value) : value, // Forzamos a number
  }));
};
  const handleSubmit = (e) => {
    e.preventDefault();
    postSeguimiento(formData)
      .then((data) => {
        const updatedTitle = { ...title, idSeguimiento: data.id };
        updateTitle(updatedTitle.id, updatedTitle);
        Swal.fire("Éxito", "Datos guardados correctamente", "success");
        updateCountStudents(dispatch);
        navigate(-1);
      })
      .catch((error) => {
        Swal.fire("Error", "Hubo un problema al guardar los datos", "error");
      });
  };

  return (
   <center><div className={`${style.overlay}`}>
      <div className={`${style.modalContainer}`}>
       
        {/* Header */}
        <div className={style.modalHeader}>
          <h2>Agregar Informacion laboral</h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={style.modalBody}>
            <div>
                <label>Tipo de Institucion</label>
                <select
                name="typeInstitution"
                value={formData.typeInstitution}
                onChange={handleChange}
                required
                >
                  <option value="Publica" >Publica</option>
                  <option value="Privada">Privada</option>
                
                </select>
                
            </div>
            <div>
                <label>Nombre de la Institucion</label>
               
                <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Cargo</label>
               
                <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Fecha de Inicio</label>
                <input
                type="date"
                name="fecha_inicio"
                value={formData.fecha_inicio}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Fecha Fin</label>
                <input
                type="date"
                name="fecha_fin"
                value={formData.fecha_fin}
                onChange={handleChange}
                required
                />
            </div>
            <div>
                <label>Salario Aprox</label>
                <input
                type="number"
                name="salario_aprox"
                value={formData.salario_aprox}
                onChange={handleChange}
                min="0"
                required
                />
            </div>
            <div>
                <label>Observación</label>
                <textarea
                  name="Observacion"
                  value={formData.Observacion}
                  onChange={handleChange}
                  rows="3"
                />
            </div>
            {/* Footer con botones */}
            <div className={style.modalFooter}>
                <button
                type="button"
                onClick={() => navigate(-1)}
                className={style.cancelBtn}
                >
                Cancelar
                </button>
                <button type="submit" className={style.saveBtn}>
                Guardar
                </button>
            </div>
        </form>
      </div>
    </div>
    </center>
  );
};

export default AddSeguimientoForm;