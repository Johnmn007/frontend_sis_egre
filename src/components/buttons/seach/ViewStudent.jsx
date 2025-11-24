import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import style from "./Detalles.module.css"; // 👈 tu CSS 

const ViewStudent = ({id}) => {
  

  return (     
    <Link 
      to={`/StudentView/${id}`}
      title="Ver Detalles"

      className={style.detallesBtn}
    >
      <Search size={18} />
    </Link>

  );
};

export default ViewStudent;
