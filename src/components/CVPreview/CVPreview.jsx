import styles from "./CVPreview.module.css";

const toList = (s) => s.split(",").map((x) => x.trim()).filter(Boolean);

export default function CVPreview({ data: d }) {
  const info = [d.dob, d.gender, d.marital, d.military].filter(Boolean).join(" · ");
  const web = [d.linkedin, d.github, d.website].filter(Boolean).join(" · ");

  return (
    <div id="cv-preview" className={styles.cv}>
      <div className={styles.head}>
        {d.photo && <img className={styles.photo} src={d.photo} alt="" />}
        <div>
          <h3>
            {d.first} {d.last}
          </h3>
          <div className={styles.contact}>
            {d.email} · {d.phone}
          </div>
          {info && <div className={styles.contact}>{info}</div>}
        </div>
      </div>

      {d.summary && (
        <>
          <h4>Haqqında</h4>
          <p>{d.summary}</p>
        </>
      )}

      {d.company && (
        <>
          <h4>Təcrübə</h4>
          <p>
            <b>{d.role}</b>, {d.company} ({d.from} – {d.to})
            {d.empType ? ` · ${d.empType}` : ""}
          </p>
          {d.duties && <p>{d.duties}</p>}
        </>
      )}

      {d.school && (
        <>
          <h4>Təhsil</h4>
          <p>
            <b>{d.eduType}</b>, {d.field}, {d.school} ({d.eduFrom} – {d.eduTo})
          </p>
        </>
      )}

      {d.skills && (
        <>
          <h4>Bacarıqlar</h4>
          <div>
            {toList(d.skills).map((s) => (
              <span key={s} className={styles.chip}>
                {s}
              </span>
            ))}
          </div>
        </>
      )}

      {d.langs && (
        <>
          <h4>Dillər</h4>
          <p>{d.langs}</p>
        </>
      )}

      {web && (
        <>
          <h4>Veb</h4>
          <p>{web}</p>
        </>
      )}

      {(d.hobbies || d.license) && (
        <>
          <h4>Digər</h4>
          {d.hobbies && <p>Hobbilər: {d.hobbies}</p>}
          {d.license && <p>Sürücülük vəsiqəsi: {d.license}</p>}
        </>
      )}
    </div>
  );
}
