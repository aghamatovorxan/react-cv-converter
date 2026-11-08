import * as P from "./patterns";

const text = (name, label, o = {}) => ({
  name,
  label,
  type: "text",
  pattern: P.TEXT2,
  message: "Ən azı 2 simvol",
  ...o,
});

const select = (name, label, options, o = {}) => ({
  name,
  label,
  type: "select",
  options,
  ...o,
});

const years = { pattern: P.YEAR, message: "İl: məsələn 2020" };
const link = { full: true, pattern: P.URL_RE, message: "Link düzgün deyil" };

export const steps = [
  {
    id: "personal",
    title: "Şəxsi məlumat",
    fields: [
      text("first", "Ad *", { required: true, top: true, pattern: P.NAME, message: "Yalnız hərflər" }),
      text("last", "Soyad *", { required: true, top: true, pattern: P.NAME, message: "Yalnız hərflər" }),
      text("phone", "Telefon *", { required: true, top: true, pattern: P.PHONE, message: "Format: +994 XX XXX XX XX" }),
      text("email", "Email *", { required: true, top: true, pattern: P.EMAIL, message: "Email düzgün deyil" }),
      text("dob", "Doğum tarixi", { type: "date", pattern: P.DATE, message: "Tarix düzgün deyil" }),
      select("gender", "Cins", ["Kişi", "Qadın"]),
      select("marital", "Ailə vəziyyəti", ["Subay", "Evli", "Boşanmış"]),
      select("military", "Hərbi vəziyyət", ["Xidmət edib", "Xidmət etməyib", "Tələb olunmur"]),
    ],
  },
  {
    id: "skills",
    title: "Bacarıqlar",
    fields: [
      text("skills", "Bacarıqlar * (vergüllə ayırın)", { required: true, full: true, pattern: P.LIST, message: "Məsələn: React, CSS, Git" }),
      text("langs", "Dillər (vergüllə ayırın)", { full: true, pattern: P.LIST, message: "Məsələn: Azərbaycan, İngilis" }),
    ],
  },
  {
    id: "web",
    title: "Veb",
    fields: [
      text("linkedin", "LinkedIn", link),
      text("github", "GitHub", link),
      text("website", "Şəxsi sayt", link),
    ],
  },
  {
    id: "education",
    title: "Təhsil",
    fields: [
      select("eduType", "Təhsil növü *", ["Orta", "Peşə", "Bakalavr", "Magistr", "Doktorantura"], { required: true, pattern: P.SELECTED, message: "Seçin" }),
      text("school", "Təhsil müəssisəsi *", { required: true }),
      text("field", "İxtisas *", { required: true }),
      text("eduFrom", "Başlama ili *", { required: true, ...years }),
      text("eduTo", "Bitirmə ili *", { required: true, ...years }),
    ],
  },
  {
    id: "experience",
    title: "Təcrübə",
    fields: [
      text("company", "Şirkət *", { required: true }),
      text("role", "Vəzifə *", { required: true }),
      select("empType", "İş növü", ["Tam ştat", "Yarım ştat", "Frilans", "Staj"]),
      text("from", "Başlama ili *", { required: true, ...years }),
      text("to", "Bitmə ili * (və ya “indi”)", { required: true, pattern: P.YEAR_OR_NOW, message: "İl və ya “indi”" }),
      text("duties", "Vəzifələr", { type: "area", full: true, pattern: P.TEXT10, message: "Ən azı 10 simvol" }),
    ],
  },
  {
    id: "other",
    title: "Digər",
    fields: [
      text("summary", "Özün haqqında *", { type: "area", required: true, full: true, pattern: P.TEXT20, message: "Ən azı 20 simvol" }),
      text("hobbies", "Hobbilər", { full: true }),
      select("license", "Sürücülük vəsiqəsi", ["Var", "Yoxdur"]),
    ],
  },
];

export const allFields = steps.flatMap((s) => s.fields);
