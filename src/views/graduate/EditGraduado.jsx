import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { getListEgresados } from "../../service/getList";
import { updateStudent } from "../../service/Student";
import { updateEgresados } from "../../service/Egresados";
import EditCarrera from "../../features/Graduate/edit/EditCarrera";
import EditFormStudent from "../../features/Graduate/edit/EditFormStudent";
import EditCardCarrera from "../../features/Graduate/edit/EditCardCarrera";
import AddCarreraEdit from "../../features/Graduate/edit/AddCarreraEdit";
import Swal from "sweetalert2";

const apiUrl = process.env.REACT_APP_API_URL;

export default function EditGraduate() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  const [formStudent, setFormStudent] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    dni: '',
    email: '',
    photo: null
  });

  const [DataProf, setDataProf] = useState([]);
  const [ProfSelect, setProfSelect] = useState();
  const [EditProfessions, setEditProfessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGraduate = async () => {
    try {
      setLoading(true);
      const filters = { id };
      const data = await getListEgresados(filters);

      if (Array.isArray(data) && data.length > 0) {
        const student = data[0];
        setFormStudent({
          id: student.id || '',
          firstName: student.firstName || '',
          lastName: student.lastName || '',
          gender: student.gender || '',
          age: student.age || '',
          dni: student.dni || '',
          email: student.email || '',
          photo: student.photo || null
        });
        setDataProf(student.StudentGraduates || []);

        if (student.photo) {
          setImage(`${apiUrl}${student.photo}`);
        } else {
          setImage(null);
        }
      } else {
        setError("Egresado no encontrado.");
      }
    } catch (err) {
      console.error("Error al obtener datos del egresado:", err);
      setError("Hubo un problema al cargar los datos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchGraduate();
    }
  }, [id]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormStudent({ ...formStudent, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // vista previa
      };
      reader.readAsDataURL(file);
    }
  };

  const guardarCambiosEstudiante = async () => {
    try {
      if (!formStudent.firstName || !formStudent.dni) {
        Swal.fire("Advertencia", "Nombre y DNI son obligatorios", "warning");
        return;
      }

      const resNewStudent = await updateStudent(formStudent.id, formStudent);

      for (let edit of EditProfessions) {
        await updateEgresados(edit.id, edit);
      }

      // ✅ Refrescar imagen actualizada desde el backend
      if (resNewStudent && resNewStudent.photo) {
        setImage(`${apiUrl}${resNewStudent.photo}`);
      }

      Swal.fire("Éxito", "Cambios guardados correctamente", "success");
      navigate("/Graduates");
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      Swal.fire("Error", "Hubo un problema al guardar", "error");
    }
  };

  return (
    <div className="container">
      {loading && <p>Cargando datos del egresado...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="image-container">
        <div className="image-preview">
          {image && (
            <img
              src={image}
              alt="Preview"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          )}
        </div>
        <input
          type="file"
          name="photo"
          onChange={handlePhotoChange}
          accept="image/*"
        />
      </div>

      {!loading && !error && (
        <EditFormStudent
          setShowModal={setShowModal}
          formStudent={formStudent}
          setFormStudent={setFormStudent}
        />
      )}

      <button onClick={() => setShowModal2(true)}>Agregar Carrera</button>

      <EditCardCarrera
        setShowModal={setShowModal}
        DataProf={DataProf}
        setProfSelect={setProfSelect}
        fetchGraduate={fetchGraduate}
      />

      {showModal && (
        <EditCarrera
          onClose={() => setShowModal(false)}
          ProfSelect={ProfSelect}
          EditProfessions={EditProfessions}
          setEditProfessions={setEditProfessions}
          setDataProf={setDataProf}
        />
      )}

      {showModal2 && (
        <AddCarreraEdit
          onClose={() => setShowModal2(false)}
          idStudent={id}
          onSaved={fetchGraduate}
        />
      )}

      <button onClick={guardarCambiosEstudiante}>
        Guardar cambios del estudiante
      </button>
    </div>
  );
}
