import React, { useState,useContext } from "react";
import { useNavigate } from 'react-router-dom';

import AddCarrera from "../../features/Graduate/add/AddCarrera";
import FormStudent from "../../features/Graduate/add/FormStudent";
import TableCarrera from "../../features/Graduate/add/TableCarrera";

import { DataContext } from "../../context/Context";
import { updateCountStudents } from "../../service/Count";
import { postEgresados } from "../../service/Egresados";
import { postStudent , uploadPhotoEstudent  } from "../../service/Student";
import style from "../../assets/css/AddNewGraduate.css"

import Swal from "sweetalert2";


const apiUrl = process.env.REACT_APP_API_URL;
export default function AddNewGraduate() {
  const navigate = useNavigate();
  const {  dispatch } = useContext(DataContext);
  const [ setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStudent,setNewStudent]= useState({
    firstName: '',
    lastName: '',
    gender: '',
    age: '',
    dni: '',
    email: '',
    address: '',
    celular: '',
    observacion: '',
    photo: null,
    id_departamento: '',
    id_Provincia: '',
    id_distrito: ''
  })
  const [studentCarrera,setStudentCarrera]=useState([]);

  
 const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("photo", file);

  try {
    const { filename, url } = await uploadPhotoEstudent(formData);
    setImage(URL.createObjectURL(file)); // Vista previa
    
    

    setNewStudent({ ...newStudent, photo: `${apiUrl}${url}` }); // Ruta completa
  } catch (error) {
    Swal.fire("Error", "No se pudo subir la imagen", "error");
  }
};


  const GuardarStudent = async () => {
    try {
      const resNewStudent = await postStudent(newStudent);

      for (let i = 0; i < studentCarrera.length; i++) {
        studentCarrera[i].idStudent = resNewStudent.id;
        await postEgresados(studentCarrera[i]);
      }

      await updateCountStudents(dispatch);
      
      Swal.fire("Éxito", "Estudiante y carreras guardados correctamente", "success");
      navigate("/Dashboard");
    } catch (err) {
      Swal.fire("Error", "Hubo un problema al guardar los datos", "error");
    }
  };


  
  return (
   <div className="container">


  {/* 🔹 Sección superior con imagen y formulario */}
  <div className="top-section">
    <div className="image-container">
      {/* Aquí podrías poner tu imagen */}
    </div>  

    <FormStudent newStudent={newStudent} setNewStudent={setNewStudent} />

    {/* Modal para agregar carrera */}
    {showModal && (
      <AddCarrera 
        onClose={() => setShowModal(false)} 
        studentCarrera={studentCarrera}
        setStudentCarrera={setStudentCarrera}
      />
    )}

      {/* 🔹 Botones arriba a la derecha */}
  <div className="button-group">
    <button onClick={() => setShowModal(true)} className="add-carrera-btn">
      Registrar Carrera
    </button>
   
  </div>


    {/* Tabla de carreras */}
    <TableCarrera studentCarrera={studentCarrera} />  
     <button className="submit-btn" type="submit" onClick={GuardarStudent}>
      Guardar
    </button> 
  </div>

</div>

  );
}


