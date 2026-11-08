import { useField } from "formik";
import styles from "./Field.module.css";

export default function Field({ field }) {
  const [props, meta] = useField(field.name);
  const hasError = meta.touched && meta.error;
  const common = {
    id: field.name,
    ...props,
    className: hasError ? styles.bad : "",
  };

  return (
    <div className={field.full ? styles.full : ""}>
      <label htmlFor={field.name} className={styles.label}>
        {field.label}
      </label>

      {field.type === "select" ? (
        <select {...common}>
          <option value="">Seçin</option>
          {field.options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : field.type === "area" ? (
        <textarea rows="3" {...common} />
      ) : (
        <input type={field.type} {...common} />
      )}

      <div className={styles.error}>{hasError ? meta.error : ""}</div>
    </div>
  );
}
