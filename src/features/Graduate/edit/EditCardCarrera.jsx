import React, { useState, useEffect } from "react";
import { getTecProf } from "../../../service/tecProfessional";
import { deleteEgresados } from "../../../service/Egresados";
import Swal from "sweetalert2";

const EditCardCarrera = ({ setShowModal, DataProf, setProfSelect, fetchGraduate }) => {
  const [professions, setProfessions] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profData = await getTecProf();
        setProfessions(profData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const getProfessionName = (id) => {
    const prof = professions.find((p) => String(p.id) === String(id));
    return prof ? prof.nameProfession : "Desconocido";
  };

  const EditProf = (card) => {
    setShowModal(true);
    setProfSelect(card);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la carrera.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (result.isConfirmed) {
      try {
        setDeletingId(id);
        await deleteEgresados(id);
        await fetchGraduate();
        Swal.fire("Eliminado", "La carrera ha sido eliminada.", "success");
      } catch (error) {
        console.error("Error al eliminar carrera:", error);
        Swal.fire("Error", "No se pudo eliminar la carrera.", "error");
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Carrera</th>
          <th>Año de Ingreso</th>
          <th>Año de Egreso</th>
          <th>Observación</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {DataProf.map((card) => (
          <tr key={card.id}>
            <td>{getProfessionName(card.idProfessional)}</td>
            <td>{card.ageEntry}</td>
            <td>{card.ageGraduation}</td>
            <td>{card.Observacion}</td>
            <td>
              <button onClick={() => EditProf(card)}>Editar</button>
              <button
                disabled={deletingId === card.id}
                onClick={() => handleDelete(card.id)}
              >
                {deletingId === card.id ? "Eliminando..." : "Eliminar"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditCardCarrera;
