import { useState } from "react";
import CVForm from "./components/CVForm/CVForm";
import CVPreview from "./components/CVPreview/CVPreview";
import CVTable from "./components/CVTable/CVTable";
import useLocalStorage from "./hooks/useLocalStorage";
import { exportPdf } from "./utils/exportPdf";
import { initialValues } from "./utils/validation";
import styles from "./App.module.css";

export default function App() {
  const [saved, setSaved] = useLocalStorage("cvs", []);
  const [live, setLive] = useState({ values: initialValues, dirty: false });
  const [viewId, setViewId] = useState(null);
  const [busy, setBusy] = useState(false);

  const shown = saved.find((x) => x.id === viewId);
  const data = live.dirty || !shown ? live.values : shown.values;
  const hasData = data.first || data.last || data.email;

  const addCv = (values) => {
    const id = Date.now();
    setSaved((list) => [...list, { id, values }]);
    setViewId(id);
  };

  const removeCv = (id) => {
    setSaved((list) => list.filter((x) => x.id !== id));
    if (viewId === id) setViewId(null);
  };

  const download = async () => {
    setBusy(true);
    try {
      await exportPdf("cv-preview", `CV-${data.first}-${data.last}.pdf`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={styles.layout}>
      <CVForm
        onAdd={addCv}
        onChange={(values, dirty) => setLive({ values, dirty })}
      />
      <div className={styles.right}>
        <div className={styles.card}>
          {hasData ? (
            <>
              <CVPreview data={data} />
              <button className={styles.pdf} onClick={download} disabled={busy}>
                {busy ? "Hazırlanır…" : "PDF yüklə"}
              </button>
            </>
          ) : (
            <p className={styles.hint}>Formu doldurun, CV burada görünəcək.</p>
          )}
        </div>
        {saved.length > 0 && (
          <CVTable items={saved} activeId={viewId} onShow={setViewId} onDelete={removeCv} />
        )}
      </div>
    </div>
  );
}
