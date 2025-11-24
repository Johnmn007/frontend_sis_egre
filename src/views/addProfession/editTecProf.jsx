import React, { useState, useEffect } from 'react';
import { getIdTecProf, updateTecProf } from '../../service/tecProfessional';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../assets/css/Form.css'; // 🔹 Aquí se enlaza tu CSS

const EditTecProf = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tecProf, setTecProf] = useState({
    nameProfession: '',
  });

  useEffect(() => {
    const fetchProfession = async () => {
      try {
        const data = await getIdTecProf(id);
        if (data) {
          setTecProf({
            nameProfession: data.nameProfession || '',
          });
        }
      } catch (error) {
        console.error('Error al obtener la profesión:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo cargar la profesión.',
          icon: 'error',
          timer: 5000,
          showConfirmButton: true,
        });
      }
    };
    fetchProfession();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTecProf((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickActualizarTecProf = async (e) => {
    e.preventDefault();
    try {
      await updateTecProf(id, tecProf);

      Swal.fire({
        title: 'Actualización exitosa',
        text: 'La profesión ha sido actualizada correctamente.',
        icon: 'success',
        timer: 4000,
        showConfirmButton: true,
      });

      navigate('/TecProfession');
    } catch (error) {
      console.error('Error al actualizar:', error);
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al actualizar. Inténtalo nuevamente.',
        icon: 'error',
        timer: 5000,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div className="centerContainer">
      <h2 className="title">Editar Profesión</h2>

      <form className="formContainer" onSubmit={handleClickActualizarTecProf}>
        <div className="formGroup">
          <label htmlFor="nameProfession">Nombre de la Profesión</label>
          <input
            type="text"
            id="nameProfession"
            name="nameProfession"
            className="inputField"
            placeholder="Ejemplo: Ingeniería de Software"
            value={tecProf.nameProfession}
            onChange={handleChange}
            required
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px',
            marginTop: '20px',
          }}
        >
          <button
            type="button"
            className="cancelButton"
            onClick={() => navigate('/TecProfession')}
          >
            Cancelar
          </button>

          <button type="submit" className="addButton">
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTecProf;
