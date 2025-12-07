import React, { useState, useEffect } from "react";
import { getDepartaments, getProvincias, getDistritos } from "../../../service/Ubigeo";

import style from "../../../assets/css/FormStudent.module.css";

const FormStudent = ({ newStudent, setNewStudent }) => {
  const [departamentos, setDepartamentos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [distritos, setDistritos] = useState([]);

  // Cargar departamentos
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const data = await getDepartaments();
        setDepartamentos(data);
      } catch (err) {
        console.error("Error al obtener departamentos:", err);
      }
    };
    fetchDepartamentos();
  }, []);

  // Provincias al cambiar departamento
  useEffect(() => {
    if (!newStudent.id_departamento) {
      setProvincias([]);
      setDistritos([]);
      return;
    }
    const fetchProvincias = async () => {
      try {
        const data = await getProvincias(newStudent.id_departamento);
        setProvincias(data);
        setDistritos([]);
      } catch (err) {
        console.error("Error al obtener provincias:", err);
      }
    };
    fetchProvincias();
  }, [newStudent.id_departamento]);

  // Distritos al cambiar provincia
  useEffect(() => {
    if (!newStudent.id_Provincia) {
      setDistritos([]);
      return;
    }
    const fetchDistritos = async () => {
      try {
        const data = await getDistritos(newStudent.id_Provincia);
        setDistritos(data);
      } catch (err) {
        console.error("Error al obtener distritos:", err);
      }
    };
    fetchDistritos();
  }, [newStudent.id_Provincia]);

  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  return (
    <div className={style.formBox}>
    <div className={style.formGrid}>
      <div className={style.formGroup}>
        <input
          type="text"
          name="firstName"
          value={newStudent.firstName}
          onChange={handleStudentChange}
          required
        />
        <label>Nombres</label>
      </div>
    
      <div className={style.formGroup}>
        <input
          type="text"
          name="lastName"
          value={newStudent.lastName}
          onChange={handleStudentChange}
          required
          />
        <label>Apellidos</label>
      </div>

      <div className={style.formGroup}>
        <select 
        style={{ color: '#4873e0ff' }}
        name="gender" value={newStudent.gender} onChange={handleStudentChange} required>
          <option value="">Seleccionar género</option>
          <option value="MASCULINO">MASCULINO</option>
          <option value="FEMENINO">FEMENINO</option>
        </select>
        {/* <label>Género</label> */}
      </div>

      <div className={style.formGroup}>
        <input
          type="text"
          name="dni"
          value={newStudent.dni}
          onChange={handleStudentChange}
          required
        />
        <label>DNI</label>
      </div>

      <div className={style.formGroup}>
        <input
          type="number"
          name="age"
          value={newStudent.age}
          onChange={handleStudentChange}
          required
        />
        <label>Edad</label>
      </div>

      <div className={style.formGroup}>
        <input
          type="email"
          name="email"
          value={newStudent.email}
          onChange={handleStudentChange}
          required
        />
        <label>Email</label>
      </div>

      <div className={style.formGroup}>
        <input
          type="text"
          name="address"
          value={newStudent.address}
          onChange={handleStudentChange}
          required
        />
        <label>Dirección</label>
      </div>
      <div className={style.formGroup}>
        <input
          type="text"
          name="celular"
          value={newStudent.celular}
          onChange={handleStudentChange}
          required
        />
        <label>Celular</label>
      </div>
      <div className={style.formGroup}>
        <select 
        style={{ color: '#4873e0ff' }}
        name="id_departamento" value={newStudent.id_departamento} onChange={handleStudentChange} required>
          <option  value="">Seleccionar Departamento</option>
          {departamentos.map((dep) => (
            <option key={dep.id} value={dep.id}>{dep.name}</option>
          ))}
        </select>
        {/* <label>Departamento</label> */}
      </div>

      <div className={style.formGroup}>
        <select 
        style={{ color: '#4873e0ff' }}
        name="id_Provincia" value={newStudent.id_Provincia} onChange={handleStudentChange} required>
          <option value="">Seleccionar Provincia</option>
          {provincias.map((prov) => (
            <option key={prov.id} value={prov.id}>{prov.name}</option>
          ))}
        </select>
        {/* <label>Provincia</label> */}
      </div>

      <div className={style.formGroup}>
        <select 
        style={{ color: '#4873e0ff' }}
        name="id_distrito" value={newStudent.id_distrito} onChange={handleStudentChange} required>
          <option value="">Seleccionar distrito</option>
          {distritos.map((dist) => (
            <option key={dist.id} value={dist.id}>{dist.name}</option>
          ))}
        </select>
        {/* <label>Distrito</label> */}
      </div>
    </div>
  </div>
  );
};

export default FormStudent;
