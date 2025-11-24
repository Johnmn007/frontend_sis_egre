import React from "react";

const Cuadro = ({ dataProfessions }) => {
  return (
    <div style={{ marginTop: "2rem", overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "center",
          backgroundColor: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <thead style={{ backgroundColor: "#f4f4f4" }}>
          <tr>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Profesión</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Graduados</th>
            <th style={{ padding: "10px", border: "1px solid #ddd" }}>Titulados</th>
          </tr>
        </thead>
        <tbody>
          {dataProfessions.map((item) => (
            <tr key={item.id}>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.nameProfession}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.countGraduate}
              </td>
              <td style={{ padding: "10px", border: "1px solid #ddd" }}>
                {item.countTitulado}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cuadro;
