import React, { useState, useEffect,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { postTitle } from "../../../service/Titulados";
import { getIdEgresados } from "../../../service/Egresados";
import { getIdTecProf } from "../../../service/tecProfessional";
import { getModalidad } from "../../../service/modalidades";
import { DataContext } from "../../../context/Context";
import { updateCountStudents } from "../../../service/Count";
import Swal from "sweetalert2";
import style from "../../../assets/css/Title/AddTitleForm.module.css";

const AddTitleForm = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(DataContext);
  const { id } = useParams();
  const [carrera, setCarrera] = useState({});
  const [modalidades, setModalidades] = useState([]);
  const [formData, setFormData] = useState({
    idGraduate: "",
    idProfessional: "",
    idStudent: "",
    idSeguimiento: null,
    idModalidad: "",
    ageTitle: "",
    numberTitle: "",
    numberResolution: "",
    Observacion: "",
    photoTitle: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const graduate = await getIdEgresados(id);
        if (graduate) {
          setFormData((prev) => ({
            ...prev,
            idGraduate: graduate.id || "",
            idProfessional: graduate.idProfessional || "",
            idStudent: graduate.idStudent || "",
          }));
          if (graduate.idProfessional) {
            const prof = await getIdTecProf(graduate.idProfessional);
            setCarrera(prof || {});
          }
        }
        const modalidades = await getModalidad();
        setModalidades(modalidades || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, [id]);

  // const handleChange = (e) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value,
  //   });
  // };
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: name === "idModalidad" ? Number(value) : value, // Forzamos a number
  }));
};

  const handleSubmit = (e) => {
    e.preventDefault();
    postTitle(formData)
      .then((data) => {
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
          <h2>Agregar Título</h2>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={style.modalBody}>
          <div>
            <label>Carrera</label>
            <input
              type="text"
              value={carrera.nameProfession || ""}
              disabled
            />
          </div>

          <div>
            <label>Modalidad de Titulación</label>
            <select
              name="idModalidad"
              value={formData.idModalidad}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una modalidad</option>
              {modalidades.map((mod) => (
                <option key={mod.id} value={mod.id}>
                  {mod.descrition}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Fecha de obtención</label>
            <select
              name="ageTitle"
              value={formData.ageTitle}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un año</option>
              {Array.from({ length: 50 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <label>N° de Título</label>
            <input
              type="text"
              name="numberTitle"
              value={formData.numberTitle}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>N° de Resolución</label>
            <input
              type="text"
              name="numberResolution"
              value={formData.numberResolution}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Observación</label>
            <input
              type="text"
              name="Observacion"
              value={formData.Observacion}
              onChange={handleChange}
              
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

export default AddTitleForm;