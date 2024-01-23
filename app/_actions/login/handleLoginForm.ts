"use server";
import * as yup from "yup";
import { login } from "./helpers/login";

const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Email is not valid")
    .required("Email Required")
    .max(255, "Maximum length of email is 255"),
  password: yup
    .string()
    .trim()
    .required("Password Required")
    .max(255, "Maximum password length is 255")
    .matches(
      /^(?=.*?[A-Za-z])(?=.*\d)(?=.*[-'/`~!#*$@_%+=.,^&(){}[\]|;:"<>?\\])\S{6,}$/,
      "Password should be a minimum of 6 characters, including a letter, number and special character"
    ),
});

export async function handleLoginForm(
  state: { data: null | string; errors: null | [] },
  formData: FormData
): Promise<{ data: null | string; errors: null | [] }> {
  try {
    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await validationSchema.validate(user, { abortEarly: false });

    const data = await login({
      email: user.email?.toString() ?? "",
      password: user.password?.toString() ?? "",
    });

    //TODO Store token

    return { data: data, errors: null };
  } catch (err: any) {
    if (err.name === "ValidationError") {
      const errors = err.inner.map((e: any) => e.message);
      return { data: null, errors };
    } else {
      //TODO Handle server error properly
      console.log("ERROR CATCH ON HANDLE LOGIN");
      console.log(err);
      return { data: null, errors: null };
    }
  }
}
