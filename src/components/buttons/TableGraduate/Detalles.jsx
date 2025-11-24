import { Search } from "lucide-react";
import style from "./Detalles.module.css"; // 👈 tu CSS moderno

const Detalles = ({setSelectedStudentId,setShowModal ,studentId }) => {
  const handleClick = () => {
    setSelectedStudentId(studentId); // Reiniciar el ID seleccionado
    setShowModal(true); // Mostrar el modal
  };

  return (     
    <button 
      onClick={handleClick} 

      className={style.detallesBtn}
    >
      <Search size={18} />
    </button>

  );
};

export default Detalles;
