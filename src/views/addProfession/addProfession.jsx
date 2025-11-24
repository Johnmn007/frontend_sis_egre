    import React, { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import Swal from "sweetalert2";
    import { postTecProf } from "../../service/tecProfessional"; // ✅ Corrección aquí
    import style from "../../assets/css/addProfession.module.css"; // ✅ Ruta correcta

    const AddProfession = () => {
    const [nameProfession, setNameProfession] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nameProfession.trim()) {
        Swal.fire("Error", "El nombre de la carrera es obligatorio", "error");
        return;
        }

        try {
        await postTecProf({ nameProfession }); // ✅ Usamos postTecProf
        Swal.fire("Éxito", "Carrera agregada correctamente", "success");
        navigate("/TecProfession");
        } catch (error) {
        Swal.fire("Error", "No se pudo agregar la carrera", "error");
        console.error(error);
        }
    };

    return (
        <div className={style.centerContainer}>
        <h2 className={style.title}>Agregar Carrera</h2>
        <form onSubmit={handleSubmit} className={style.formContainer}>
            <div className={style.formGroup}>
            <label>Nombre de la Carrera:</label>
            <input
                type="text"
                value={nameProfession}
                onChange={(e) => setNameProfession(e.target.value)}
                className={style.inputField}
                placeholder="Ej: Administración de Empresas"
            />
            </div>
            <button type="submit" className={style.addButton}>
            Guardar
            </button>
            <button
            type="button"
            className={style.cancelButton}
            onClick={() => navigate("/TecProfession")}
            >
            Cancelar
            </button>
        </form>
        </div>
    );
    };

    export default AddProfession;
