"use client";
import classNames from "classnames";
import styles from "./LoginForm.module.scss";
import TextField from "@/app/_components/TextField";
import PasswordField from "@/app/_components/PasswordField";
import SendFormButton from "@/app/_components/SendFormButton";
import { handleLoginForm } from "@/app/_actions/login/handleLoginForm";
import { useFormState } from "react-dom";

export default function LoginForm() {
  const [state, formAction] = useFormState(handleLoginForm, {
    data: null,
    errors: null,
  });

  return (
    <form className={classNames(styles.form)} action={formAction} >
      <TextField label="E-mail" name="email" placeholder="E-mail" />
      <PasswordField
        className={styles.field}
        label="Password"
        name="password"
      />
      <div className={styles.controls}>
        <SendFormButton size="md" variant="contained" color="blue" >
          Sign In
        </SendFormButton>
      </div>
      {state.errors && state.errors.length > 0 && (
        <div>
          {state.errors.map((error, index) => (
            <span key={index}>{error}</span>
          ))}
        </div>
      )}
    </form >
  );
}
