import * as Yup from "yup";
import { allFields } from "./steps";

const shape = {};
allFields.forEach((f) => {
  let rule = Yup.string().trim();
  if (f.pattern) {
    rule = rule.matches(f.pattern, { message: f.message, excludeEmptyString: true });
  }
  if (f.required) rule = rule.required("Məcburidir");
  shape[f.name] = rule;
});

shape.dob = shape.dob.test("past", "Gələcək tarix ola bilməz", (v) => !v || new Date(v) <= new Date());

export const schema = Yup.object().shape(shape);

export const initialValues = {
  ...Object.fromEntries(allFields.map((f) => [f.name, ""])),
  photo: "",
};
