import { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import Stepper from "../Stepper/Stepper";
import Field from "../Field/Field";
import { steps } from "../../utils/steps";
import { schema, initialValues } from "../../utils/validation";
import styles from "./CVForm.module.css";

const MAX_SIZE = 2 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "image/webp"];

function Watch({ onChange }) {
  const { values, dirty } = useFormikContext();
  useEffect(() => {
    onChange(values, dirty);
  }, [values, dirty]);
  return null;
}

function Steps({ step, setStep }) {
  const f = useFormikContext();
  const [photoErr, setPhotoErr] = useState("");
  const current = steps[step];
  const isLast = step === steps.length - 1;

  const onPhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!TYPES.includes(file.type)) return setPhotoErr("Yalnız JPG, PNG, WebP");
    if (file.size > MAX_SIZE) return setPhotoErr("Maksimum ölçü 2MB");
    setPhotoErr("");
    const reader = new FileReader();
    reader.onload = () => f.setFieldValue("photo", reader.result);
    reader.readAsDataURL(file);
  };

  const validateStep = async () => {
    const errors = await f.validateForm();
    const names = current.fields.map((x) => x.name);
    f.setTouched({
      ...f.touched,
      ...Object.fromEntries(names.map((n) => [n, true])),
    });
    return names.every((n) => !errors[n]);
  };

  const next = async () => {
    if (await validateStep()) setStep((s) => s + 1);
  };

  const finish = async () => {
    if (await validateStep()) f.submitForm();
  };

  const top = current.fields.filter((x) => x.top);
  const rest = current.fields.filter((x) => !x.top);

  return (
    <>
      <Stepper steps={steps} current={step} />
      <h2 className={styles.title}>{current.title}</h2>

      {step === 0 ? (
        <>
          <div className={styles.top}>
            <div className={styles.photoCol}>
              {f.values.photo ? (
                <img className={styles.avatar} src={f.values.photo} alt="Foto" />
              ) : (
                <div className={styles.avatar} />
              )}
              <input
                type="file"
                accept={TYPES.join(",")}
                onChange={onPhoto}
                aria-label="Foto"
              />
              <div className={styles.photoErr}>{photoErr}</div>
            </div>
            <div className={styles.grid}>
              {top.map((x) => (
                <Field key={x.name} field={x} />
              ))}
            </div>
          </div>
          <div className={styles.grid}>
            {rest.map((x) => (
              <Field key={x.name} field={x} />
            ))}
          </div>
        </>
      ) : (
        <div className={styles.grid}>
          {current.fields.map((x) => (
            <Field key={x.name} field={x} />
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <button type="button" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Geri
        </button>
        <button type="button" className={styles.primary} onClick={isLast ? finish : next}>
          {isLast ? "CV yarat" : "Davam et"}
        </button>
      </div>
    </>
  );
}

export default function CVForm({ onAdd, onChange }) {
  const [step, setStep] = useState(0);

  const handleSubmit = (values, { resetForm }) => {
    onAdd(values);
    resetForm();
    setStep(0);
  };

  return (
    <div className={styles.card}>
      <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleSubmit}>
        <Form noValidate>
          <Watch onChange={onChange} />
          <Steps step={step} setStep={setStep} />
        </Form>
      </Formik>
    </div>
  );
}
