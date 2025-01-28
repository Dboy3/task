import * as yup from "yup";

const formSchema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .max(30, "you reached the max limit")
    .min(2, "minimum lenght must be 2 characters"),

  age: yup
    .number()
    .required("age is required")
    .max(100, "max limit is 100")
    .min(16, "min limit is 16"),

  date: yup.string(),
});

export default formSchema;
