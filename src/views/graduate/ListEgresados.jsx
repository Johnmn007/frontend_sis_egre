import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getListEgresados } from "../../service/getList";
import Filter from "../../components/Student/Filter";
import FilterAge from "../../components/Student/FilterAge";
import FilterProfessional from "../../components/Student/FilterProfessional";
import ListProfessionalModal from "../../components/Modal/ListProfesionModal";
import Table from "../../components/Table/Table";


import style from "../../assets/css/List.module.css";

const ListEgresados = () => {
  const [filteredStudents, setFilteredStudents] = useState([]);
  
  const [professions, setProfessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({
    query: "",
    year: "",
    idProfessional: "",
  });

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchFilteredStudents();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filter]);

  const fetchFilteredStudents = async () => {
    try {
        let filters = {};
        if (filter.query) {
            const isNumber = !isNaN(filter.query);
            filters[isNumber ? "dni" : "lastName"] = filter.query;
        }
        if (filter.year) {
            filters.ageGraduation = filter.year;
        }
        if (filter.idProfessional) {
            filters.idProfessional = filter.idProfessional;
        }

        const data = await getListEgresados(filters);
        setFilteredStudents(data);
    } catch (error) {
        setFilteredStudents([]);
    }
};


  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prev) => ({ ...prev, [name]: value }));
  };

  

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />
      <FilterAge filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />
      <FilterProfessional filter={filter} setFilter={setFilter} professions={professions} setProfessions={setProfessions}/>

      <div className={style.addGraduateLink}>
        <Link  to="/Graduates/Add">Agregar Egresado</Link>
      </div>
        <div className={style.Container_table}>
            <Table data={filteredStudents} setFilteredStudents={setFilteredStudents} setShowModal={setShowModal} typeList={"Graduates"}/>
        </div>
      {showModal && (
          <ListProfessionalModal
              onClose={() => setShowModal(false)}
              
          />
      )}
    </div>
  );
};

export default ListEgresados;
