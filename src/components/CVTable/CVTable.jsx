import styles from "./CVTable.module.css";

export default function CVTable({ items, activeId, onShow, onDelete }) {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Yaradılmış CV-lər</h2>
      <div className={styles.wrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ad</th>
              <th>Vəzifə</th>
              <th>Email</th>
              <th>Telefon</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, values: v }) => (
              <tr key={id} className={id === activeId ? styles.active : ""}>
                <td>
                  {v.first} {v.last}
                </td>
                <td>{v.role}</td>
                <td>{v.email}</td>
                <td>{v.phone}</td>
                <td className={styles.btns}>
                  <button onClick={() => onShow(id)}>Göstər</button>
                  <button className={styles.del} onClick={() => onDelete(id)}>
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
