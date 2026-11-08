# CV Generator

React + Vite + Formik + Yup (regex) + CSS Modules.

## İşə salmaq

```bash
npm install
npm run dev
```

## Funksiyalar
- 6 mərhələli form (progress bar): şəxsi məlumat, bacarıqlar, veb, təhsil, təcrübə, digər
- Formik + Yup ilə regex validasiya (vacib olmayan sahələr də doldurulsa yoxlanır)
- Foto əlavə etmə (JPG/PNG/WebP, maks. 2MB)
- Form solda, canlı CV nəticəsi sağda
- Yaradılmış CV-lər cədvəldə: Göstər / Sil (localStorage-də saxlanır)
- PDF yükləmə (html2canvas + jsPDF)

## Struktur
- `src/utils/patterns.js` – regex-lər
- `src/utils/steps.js` – mərhələlər və sahələr
- `src/utils/validation.js` – Yup schema
- `src/components/` – Stepper, Field, CVForm, CVPreview, CVTable
