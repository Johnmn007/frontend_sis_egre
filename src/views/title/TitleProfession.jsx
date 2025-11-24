import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";
import { getEgresadosTituladosCarrera } from "../../service/Titulados";
import { getIdTecProf } from "../../service/tecProfessional";

import Detalles from "../../components/buttons/TableTitle/DetalleTitle";
import DetalleStudentTitle from "../../components/Student/DetalleStudentTitle";
import AddSeguimiento from "../../components/buttons/TableTitle/AddSeguimiento";
import EditTitle from "../../components/buttons/TableTitle/EditTitle";
import DeleteTitle from "../../components/buttons/TableTitle/DeleteTitle";

import style from "../../assets/css/TitleProfession.module.css";
import ReportePdf from "../../components/buttons/TableTitle/ReportePdf";

// 🔹 Toolbar personalizada con buscador
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

const TitleProfession = () => {
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
    { field: "dni", headerName: "DNI", width: 120 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "ageTitle", headerName: "Año de Titulación", width: 150 },
    { field: "numberTitle", headerName: "N° Titulo", width: 120 },
    { field: "numberResolution", headerName: "N° Resolución", width: 150 },
    {
      field: "actions",
      headerName: "Acciones",
      width: 270,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Detalles
            studentId={params.row.idStudent}
            setSelectedStudentId={setSelectedStudentId}
            setShowModal={setShowModal}
          />
          <AddSeguimiento idTitle={params.row.id} />
          <>
            {(rol === "ADMINISTRACCION" || rol === "ADMINISTRADOR") && (
              <EditTitle idTitle={params.row.id} />
            )}
            {rol === "ADMINISTRADOR" && (
              <DeleteTitle id={params.row.id} onDeleted={fetchEgresados} />
            )}
            <ReportePdf studentId={params.row.idStudent} setSelectedStudentId={setSelectedStudentId}/>
          </>
          

        </div>
      ),
    },
  ];

  // 🔹 Cargar profesión
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

  // 🔹 Cargar titulados
  const fetchEgresados = async () => {
    try {
      setLoading(true);
      const data = await getEgresadosTituladosCarrera(id);
      
      const formatted = data.map((c, index) => ({
        id: c.id,
        idStudent: c.student?.id || "",
        index: index + 1,
        firstName: c.student?.firstName || "",
        lastName: c.student?.lastName || "",
        dni: c.student?.dni || "",
        email: c.student?.email || "",
        ageTitle: c.ageTitle,
        numberTitle: c.numberTitle,
        numberResolution: c.numberResolution,
        Observacion: c.Observacion,
      }));

      setRows(formatted);
    } catch (err) {
      console.error("Error al obtener titulados:", err);
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
      row.email.toLowerCase().includes(search)
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
        <DetalleStudentTitle
          onClose={() => setShowModal(false)}
          studentId={selectedStudentId}
        />
      )}
    </div>
  );
};

export default TitleProfession;
