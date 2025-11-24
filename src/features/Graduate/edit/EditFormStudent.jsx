import React from "react";

const EditFormStudent = ({ setShowModal, formStudent, setFormStudent }) => {
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setFormStudent({ ...formStudent, [name]: value });
  };

  return (
    <div className="form-grid">
      <input
        type="text"
        placeholder="Nombres"
        name="firstName"
        value={formStudent.firstName}
        onChange={handleStudentChange}
      />

      <input
        type="text"
        placeholder="Apellidos"
        name="lastName"
        value={formStudent.lastName}
        onChange={handleStudentChange}
      />

      <select
        name="gender"
        value={formStudent.gender}
        onChange={handleStudentChange}
        required
      >
        <option value="">Selecciona</option>
        <option value="MASCULINO">MASCULINO</option>
        <option value="FEMENINO">FEMENINO</option>
      </select>

      <input
        type="text"
        placeholder="DNI"
        name="dni"
        value={formStudent.dni}
        onChange={handleStudentChange}
      />

      <input
        type="text"
        placeholder="Edad"
        name="age"
        value={formStudent.age}
        onChange={handleStudentChange}
      />

      <input
        type="text"
        placeholder="Email"
        name="email"
        value={formStudent.email}
        onChange={handleStudentChange}
      />

      
    </div>
  );
};

export default EditFormStudent;
