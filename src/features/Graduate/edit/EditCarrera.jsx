import React, { useState, useEffect } from 'react';

import { getTecProf } from "../../../service/tecProfessional";


import styleM from "../../../assets/css/Modal.module.css";

const EditCarrera = ({ onClose,ProfSelect, EditProfessions, setEditProfessions,setDataProf }) => {
    
    const [professions, setProfessions] = useState([]);
    const [newCarrera,setNewCarrera]= useState({
        id:ProfSelect.id,
        idProfessional: ProfSelect.idProfessional,
        ageEntry: ProfSelect.ageEntry,
        ageGraduation: ProfSelect.ageGraduation,
        Observacion:ProfSelect.Observacion
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
    const GuardarCarrera = (e) => {
        e.preventDefault();

        // Reemplaza la carrera editada en EditProfessions (o DataProf directamente si prefieres)
        setEditProfessions([...EditProfessions,newCarrera]);
        
        setDataProf((prev) => {
            const updated = prev.map((c) => (c.id === newCarrera.id ? newCarrera : c));
            return updated;
        });
        onClose();
    };
      

  return (
    <div className={styleM.modalOverlay}>
      <div className={styleM.modalContent}>
        {/* Botón de cerrar en la parte superior derecha */}
        <button className={styleM.closeButton} onClick={onClose}>
          &times;
        </button>

        <h2>Ingresar Carrera</h2>
        <form action="">
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
                <label>Observacion :</label>
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

export default EditCarrera;
