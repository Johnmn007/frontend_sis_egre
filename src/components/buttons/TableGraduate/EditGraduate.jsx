import { Link } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import styles from "./EditGraduate.module.css"; // ✅ importa como styles

const EditGraduate = ({ idGraduate }) => {
  return (
    <center><Link
      to={`/EditGraduate/${idGraduate}`}
      title="Editar egresado"
      className={styles.editBtn} // ✅ usa styles.editBtn
    >
      <FaUserEdit size={22} />
    </Link></center>
  );
};

export default EditGraduate;
