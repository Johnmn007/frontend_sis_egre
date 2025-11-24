import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { getEgresadosCarrera } from "../../service/Egresados";
import { getIdTecProf } from "../../service/tecProfessional";
import Detalles from "../../components/buttons/TableGraduate/Detalles";
import DetalleStudent from "../../components/Student/DetalleStudent";
import AddTitle from "../../components/buttons/TableGraduate/AddTitle";
import EditGraduate from "../../components/buttons/TableGraduate/EditGraduate";
import DeleteGraduate from "../../components/buttons/TableGraduate/DeleteGraduate";
import style from "../../assets/css/GraduateProfession.module.css";

// Toolbar personalizada con buscador
function QuickSearchToolbar({ value, onChange }) {
  return (
    <div style={{ padding: "8px" }}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Buscar..."
        value={value}
        onChange={onChange}
        style={{ width: "250px" }}
      />
    </div>
  );
}

const GraduateProfession = () => {
  const { id } = useParams();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [profession, setProfession] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const rol = localStorage.getItem("rol")?.replace(/"/g, "").trim();


  const columns = [
    { field: "index", headerName: "N°", width: 70 },
    { field: "firstName", headerName: "Nombre", width: 150 },
    { field: "lastName", headerName: "Apellido", width: 150 },
    { field: "dni", headerName: "DNI", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "nameProfession", headerName: "Profesión", width: 200 },
    { field: "gender", headerName: "Genero", width: 100 },
    { field: "ageGraduation", headerName: "Año de Graduacción", width: 150 },
    { field: "certificadosModulares", headerName: "C. Modulares", width: 100 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 280,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Detalles
            setShowModal={setShowModal}
            setSelectedStudentId={setSelectedStudentId}
            studentId={params.row.idStudent}
          />
          <AddTitle idGraduate={params.row.id} />
          
          
            {(rol === "ADMINISTRACCION" || rol === "ADMINISTRADOR") && (
              <EditGraduate idGraduate={params.row.id} />
            )}

            {rol === "ADMINISTRADOR" && (
              <DeleteGraduate id={params.row.id} onDeleted={fetchEgresados} />
            )}
         

        </div>
      ),
    },
  ];

  // 🔹 Cargar Profesión
  useEffect(() => {
    if (!id) return;
    const fetchProfession = async () => {
      try {
        const dataProfession = await getIdTecProf(id);
        setProfession(dataProfession);
      } catch (err) {
        console.error("Error al obtener profesión:", err);
      }
    };
    fetchProfession();
  }, [id]);

  // 🔹 Cargar Egresados
  const fetchEgresados = async () => {
    try {
      setLoading(true);
      const egresados = await getEgresadosCarrera(id);
      const formatted = egresados.map((c, index) => ({
        id: c.id,
        idStudent: c.student?.id || "",
        index: index + 1,
        firstName: c.student?.firstName || "",
        lastName: c.student?.lastName || "",
        dni: c.student?.dni || "",
        email: c.student?.email || "",
        certificadosModulares: c.certificadosModulares === 1 ? "Si" : "No",
        nameProfession: c.profession?.nameProfession || "",
        gender: c.student.gender,
        ageGraduation: c.ageGraduation,
      }));
      setRows(formatted);
    } catch (err) {
      console.error("Error al obtener egresados:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) fetchEgresados();
  }, [id]);



  // 🔹 Filtrado por buscador
  const filteredRows = rows.filter((row) => {
    const search = searchText.toLowerCase();
    return (
      row.firstName.toLowerCase().includes(search) ||
      row.lastName.toLowerCase().includes(search) ||
      row.email.toLowerCase().includes(search) ||
      row.nameProfession.toLowerCase().includes(search)
    );
  });

  return (
    <div className={style.container}>
      <h1 className={style.title}>
        {profession?.nameProfession || "Cargando profesión..."}
      </h1>

      <div className={style.searchBar}>
        <QuickSearchToolbar
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className={style.dataGridWrapper}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          loading={loading}
          disableSelectionOnClick
        />
      </div>

      {showModal && selectedStudentId && (
        <DetalleStudent
          onClose={() => setShowModal(false)}
          studentId={selectedStudentId}
        />
      )}
    </div>
  );
};

export default GraduateProfession;
