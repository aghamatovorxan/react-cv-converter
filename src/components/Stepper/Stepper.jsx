import styles from "./Stepper.module.css";

export default function Stepper({ steps, current }) {
  const percent = (current / (steps.length - 1)) * 100;

  return (
    <div className={styles.stepper}>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      {steps.map((s, i) => (
        <div
          key={s.id}
          title={s.title}
          className={`${styles.node} ${i <= current ? styles.on : ""}`}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
