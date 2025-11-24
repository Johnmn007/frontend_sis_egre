import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { TextField } from "@mui/material";

import { getList } from "../../service/getList";



import ViewStudent from "../../components/buttons/seach/ViewStudent";

import style from "../../assets/css/GraduateProfession.module.css";
import DeleteStudent from "../../components/buttons/seach/DeleteStudent";

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

const List = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  
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
      width: 200,
      renderCell: (params) => (
        <div style={{ display: "flex", gap: "8px" }}>
          
          <ViewStudent id={params.row.idStudent} />

           {rol === "ADMINISTRADOR" && (
            <DeleteStudent id={params.row.idStudent} onDeleted={fetchEgresados} />
          )}
        </div>
      ),
    },
  ];

  // 🔹 Cargar Egresados
  const fetchEgresados = async () => {
    try {
      setLoading(true);
      const egresados = await getList();
      
      const formatted = egresados.map((c, index) => ({
        id: c.id,
        idStudent: c.id || "",
        index: index + 1,
        firstName: c.firstName || "",
        lastName: c.lastName || "",
        dni: c.dni || "",
        email: c.email || "",
        certificadosModulares: c.certificadosModulares === 1 ? "Si" : "No",
        // 🔹 Aquí concatenamos todas las profesiones
        nameProfession: c.egresados?.map(e => e.profession?.nameProfession).join(", \n") || "",
        gender: c.gender,
        ageGraduation: c.egresados?.map(e => e.ageGraduation).join(", ") || "",
        }));
      setRows(formatted);
    } catch (err) {
      console.error("Error al obtener egresados:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEgresados();
  }, []);

  // 🔹 Filtrado por buscador
  const filteredRows = rows.filter((row) => {
    const search = searchText.toLowerCase();
    return (
      row.firstName.toLowerCase().includes(search) ||
      row.lastName.toLowerCase().includes(search) ||
      row.email.toLowerCase().includes(search) ||
      row.dni.toLowerCase().includes(search) ||
      row.nameProfession.toLowerCase().includes(search)
    );
  });

  return (
    <div className={style.container}>
      <h1 className={style.title}>BUSCAR</h1>

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

      
    </div>
  );
};

export default List;
