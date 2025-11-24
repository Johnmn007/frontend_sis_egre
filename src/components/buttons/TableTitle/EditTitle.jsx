import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import styles from "./EditGraduate.module.css"; // ✅ importa como styles

const EditTitle = ({ idTitle }) => {
  return (
    <center><Link
      to={`/TitlesEdit/${idTitle}`}
      title="Editar Titulo"
      className={styles.editBtn} // ✅ usa styles.editBtn
    >
      <FaUserEdit size={22} />
    </Link></center>
  );
};

export default EditTitle;
