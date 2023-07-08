import Yup from "./validate";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});