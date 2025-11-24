import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIdTitle, updateTitle } from "../../service/Titulados";
import { getIdTecProf } from "../../service/tecProfessional";
import { getModalidad } from "../../service/modalidades";

import style from "../../assets/css/Title/AddTitleForm.module.css";
import Swal from "sweetalert2";

const EditTitleForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [carrera, setCarrera] = useState({});
  const [modalidades, setModalidades] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formStudent, setFormStudent] = useState({
    idGraduate: "",
    idProfessional: "",
    idStudent: "",
    idSeguimiento: "",
    idModalidad: "",
    ageTitle: "",
    numberTitle: "",
    numberResolution: "",
    Observacion: "",
    photoTitle: null,
  });

  // Cargar datos del título y catálogos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const titleData = await getIdTitle(id);

        if (!titleData) {
          throw new Error("Título no encontrado");
        }

        setFormStudent({
          idGraduate: titleData.idGraduate || "",
          idProfessional: titleData.idProfessional || "",
          idStudent: titleData.idStudent || "",
          idSeguimiento: titleData.idSeguimiento || null,
          idModalidad: titleData.idModalidad || "",
          ageTitle: String(titleData.ageTitle || ""),
          numberTitle: titleData.numberTitle || "",
          numberResolution: titleData.numberResolution || "",
          Observacion: titleData.Observacion || "",
          photoTitle: null,
        });

        if (titleData.idProfessional) {
          const prof = await getIdTecProf(titleData.idProfessional);
          setCarrera(prof);
        }

        const mods = await getModalidad();
        setModalidades(mods || []);
      } catch (error) {
        console.error("Error al cargar datos:", error);
        Swal.fire("Error", "No se pudo cargar el título", "error");
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  // Manejo de inputs
  const handleChange = (e) => {
  const { name, value } = e.target;
  setFormStudent((prev) => ({
    ...prev,
    [name]: name === "idModalidad" ? Number(value) : value, // Forzamos a number
  }));
};

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      

      await updateTitle(id, formStudent);

      Swal.fire("Éxito", "Título actualizado correctamente", "success")
        .then(() => navigate(-1));
    } catch (error) {
      console.error("Error al actualizar título:", error);
      Swal.fire("Error", "No se pudo actualizar el título", "error");
    }
  };

  if (loading) {
    return <p style={{ textAlign: "center" }}>Cargando datos...</p>;
  }

  return (
    <center>
      <div className={style.overlay}>
        <div className={style.modalContainer}>
          {/* Header */}
          <div className={style.modalHeader}>
            <h2>Editar Título</h2>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className={style.modalBody}>
            <div>
              <label>Carrera</label>
              <input type="text" value={carrera.nameProfession || ""} disabled />
            </div>

            <div>
              <label>Modalidad de Titulación</label>
              <select
                name="idModalidad"
                value={formStudent.idModalidad}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una modalidad</option>
                {modalidades.map((mod) => (
                  <option key={mod.id} value={Number(mod.id)}>
                    {mod.descrition}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label>Fecha de obtención</label>
              <select
                name="ageTitle"
                value={formStudent.ageTitle}
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
                value={formStudent.numberTitle}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>N° de Resolución</label>
              <input
                type="text"
                name="numberResolution"
                value={formStudent.numberResolution}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label>Observación</label>
              <textarea
                name="Observacion"
                value={formStudent.Observacion}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* Footer */}
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

export default EditTitleForm;
