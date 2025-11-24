import React, { useState, useEffect } from 'react';
import { getTecProf } from "../../../service/tecProfessional";
import { postEgresados } from '../../../service/Egresados';
import styleM from "../../../assets/css/Modal.module.css";

const AddCarreraEdit = ({ onClose, idStudent,onSaved }) => {
    const [professions, setProfessions] = useState([]);
    const [newCarrera, setNewCarrera] = useState({
        idProfessional: '',
        idStudent: idStudent,
        ageEntry: '',
        ageGraduation: '',
        Observacion: '' // <-- corregido a minúscula
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profData] = await Promise.all([getTecProf()]);
                setProfessions(profData);
            } catch (error) {
                console.error("Error al cargar datos:", error);
            }
        };

        fetchData();
    }, []);

    const handleCarreraChange = (e) => {
        const { name, value } = e.target;
        setNewCarrera({ ...newCarrera, [name]: value });
    };

    const GuardarCarrera = async (e) => {
    e.preventDefault();
    try {
      await postEgresados(newCarrera);
      if (onSaved) onSaved(); // ✅ Llama a la función que actualiza los datos
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar la carrera:", error);
      alert("Ocurrió un error al guardar la carrera.");
    }
  };

    return (
        <div className={styleM.modalOverlay}>
            <div className={styleM.modalContent}>
                <button className={styleM.closeButton} onClick={onClose}>
                    &times;
                </button>

                <h2>Ingresar Carrera</h2>
                <form>
                    <div className="form-group">
                        <label>Profesión</label>
                        <select
                            name="idProfessional"
                            value={newCarrera.idProfessional}
                            onChange={handleCarreraChange}
                            required
                        >
                            <option value="">Seleccione una profesión</option>
                            {professions.map((prof) => (
                                <option key={prof.id} value={prof.id}>
                                    {prof.nameProfession}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Año de Ingreso</label>
                        <select
                            name="ageEntry"
                            value={newCarrera.ageEntry}
                            onChange={handleCarreraChange}
                            required
                        >
                            <option value="">Selecciona un año</option>
                            {Array.from({ length: 50 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>

                        <label>Año de Egreso</label>
                        <select
                            name="ageGraduation"
                            value={newCarrera.ageGraduation}
                            onChange={handleCarreraChange}
                            required
                        >
                            <option value="">Selecciona un año</option>
                            {Array.from({ length: 50 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return <option key={year} value={year}>{year}</option>;
                            })}
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Observación :</label>
                        <input
                            type="text"
                            name="Observacion"
                            value={newCarrera.Observacion}
                            onChange={handleCarreraChange}
                        />
                    </div>

                    <div>
                        <button className="submit-btn" onClick={GuardarCarrera}>Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCarreraEdit;
