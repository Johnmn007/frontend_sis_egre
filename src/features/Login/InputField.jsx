
import styles from "../../assets/css/Login.module.css";

// Campo reutilizable
function InputField({ label, type, placeholder, id, value, onChange }) {
  return (
    <div className={styles.inputGroup}>
      <label className={styles.label} htmlFor={id}>{label}(*)</label>
      <input
        type={type}
        id={id}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;