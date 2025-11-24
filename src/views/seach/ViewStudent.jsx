import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AddCarrera from "../../features/Graduate/add/AddCarrera";
import FormStudent from "../../features/Graduate/add/FormStudent";
import TableCarrera from "../../features/Graduate/add/TableCarrera";

import { DataContext } from "../../context/Context";
import { updateCountStudents } from "../../service/Count";
import { updateEgresados } from "../../service/Egresados";
import { updateStudent } from "../../service/Student";

import { getListId } from "../../service/getList";
import Swal from "sweetalert2";

export default function ViewStudent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { dispatch } = useContext(DataContext);

  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    dni: "",
    email: "",
    address: "",
    observacion: "",
    photo: null,
    id_departamento: "",
    id_Provincia: "",
    id_distrito: "",
  });
  const [studentCarrera, setStudentCarrera] = useState([]);

  // 🔹 Cargar estudiante por ID
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const data = await getListId(id);

        if (data) {
          
          // setear datos del estudiante
          setNewStudent({
            firstName: data.firstName || "",
            lastName: data.lastName || "",
            gender: (data.gender || "").toUpperCase(),
            age: data.age || "",
            dni: data.dni || "",
            email: data.email || "",
            address: data.address || "",
            observacion: data.observacion || "",
            photo: data.photo || null,
            id_departamento: data.id_departamento || "",
            id_Provincia: data.id_Provincia || "",
            id_distrito: data.id_distrito || "",
          });

          // setear carreras (egresados)
          setStudentCarrera(data.egresados || []);
        }
      } catch (err) {
        Swal.fire("Error", "No se pudo cargar el estudiante", "error");
      }
    };

    fetchStudent();
  }, [id]);

  const GuardarStudent = async () => {
    try {
      const resNewStudent = await updateStudent(id,newStudent);

      // for (let i = 0; i < studentCarrera.length; i++) {
      //   studentCarrera[i].idStudent = resNewStudent.id;
      //   await updateEgresados(studentCarrera[i]);
      // }

      await updateCountStudents(dispatch);

      Swal.fire(
        "Éxito",
        "Estudiante y carreras guardados correctamente",
        "success"
      );
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
        {/* <div className="button-group">
          <button
            onClick={() => setShowModal(true)}
            className="add-carrera-btn"
          >
            Registrar Carrera
          </button>
        </div> */}

        {/* Tabla de carreras */}
        <TableCarrera studentCarrera={studentCarrera} />
        
        <button className="submit-btn" type="submit" onClick={GuardarStudent}>
          Guardar
        </button>
      </div>
    </div>
  );
}
