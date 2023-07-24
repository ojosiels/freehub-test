import { Dispatch, SetStateAction, useContext } from "react";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import "../../../styles/BaseFormStyle.css";
import "./style.css";

import { iUserLoginData, iUserRegisterData } from "../../../interfaces/user.ts";
import { UserContext } from "../../../contexts/UserContext.tsx";

interface iUserFormProps {
  setIsLoginFormOn: Dispatch<SetStateAction<boolean>>;
}

export const LoginUserForm = ({
  setIsLoginFormOn,
}: iUserFormProps): JSX.Element => {
  const { loginUser } = useContext(UserContext);
  const formSchema: ZodType<iUserLoginData> = z.object({
    username: z
      .string()
      .min(2, { message: "Minimum 2 characters" })
      .max(150, { message: "Maximum 150 characters" }),
    password: z.string().min(8, { message: "Minimum 8 characters" }),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserLoginData>({ resolver: zodResolver(formSchema) });

  return (
    <>
      <form onSubmit={handleSubmit(loginUser)} className="baseForm">
        <h2>Login</h2>

        <div>
          <label htmlFor="usernameInput">Username:</label>
          <input
            id="usernameInput"
            type="text"
            required
            minLength={2}
            maxLength={150}
            {...register("username")}
          />
          {errors.username ? <p>{errors.username.message}</p> : <br />}
        </div>

        <div>
          <label htmlFor="passwordInput">Password:</label>
          <input
            id="passwordInput"
            type="password"
            required
            minLength={8}
            {...register("password")}
          />
          {errors.password ? <p>{errors.password.message}</p> : <br />}
        </div>

        <button type="submit">Login</button>

        <p className="auxTextP">don't have an account yet?</p>
        <p
          id="redirectP"
          onClick={() => {
            setIsLoginFormOn(false);
          }}
        >
          register
        </p>
      </form>
    </>
  );
};

export const RegisterUserForm = ({
  setIsLoginFormOn,
}: iUserFormProps): JSX.Element => {
  const { registerUser } = useContext(UserContext);

  const formSchema: ZodType<iUserRegisterData> = z
    .object({
      name: z
        .string()
        .min(2, { message: "Minimum 2 characters" })
        .max(150, { message: "Maximum 150 characters" }),
      email: z
        .string()
        .email({ message: "Invalid Email" })
        .max(50, { message: "Maximum 50 characters" }),
      username: z
        .string()
        .min(2, { message: "Minimum 2 characters" })
        .max(150, { message: "Maximum 150 characters" }),
      password: z.string().min(8, { message: "Minimum 8 characters" }),
      confirmPassword: z.string().min(8, { message: "Minimum 8 characters" }),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iUserRegisterData>({ resolver: zodResolver(formSchema) });

  return (
    <>
      <form onSubmit={handleSubmit(registerUser)} className="baseForm">
        <p
          onClick={() => {
            setIsLoginFormOn(true);
          }}
          id="goBackButton"
        >
          Go Back
        </p>

        <h2>Register</h2>
        <div>
          <label htmlFor="nameInput">Name:</label>
          <input
            id="nameInput"
            type="text"
            required
            minLength={2}
            maxLength={150}
            {...register("name")}
          />
          {errors.name ? <p>{errors.name.message}</p> : <br />}
        </div>

        <div>
          <label htmlFor="emailInput">Email:</label>
          <input
            id="emailInput"
            type="text"
            required
            maxLength={50}
            {...register("email")}
          />
          {errors.email ? <p>{errors.email.message}</p> : <br />}
        </div>

        <div>
          <label htmlFor="usernameInput">Username:</label>
          <input
            id="usernameInput"
            type="text"
            required
            minLength={2}
            maxLength={150}
            {...register("username")}
          />
          {errors.username ? <p>{errors.username.message}</p> : <br />}
        </div>

        <div>
          <label htmlFor="passwordInput">Password:</label>
          <input
            id="passwordInput"
            type="password"
            required
            minLength={8}
            {...register("password")}
          />
          {errors.password ? <p>{errors.password.message}</p> : <br />}
        </div>

        <div>
          <label htmlFor="confirmPasswordInput">Confirma Password:</label>
          <input
            id="confirmPasswordInput"
            type="password"
            required
            minLength={8}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword ? (
            <p>{errors.confirmPassword.message}</p>
          ) : (
            <br />
          )}
        </div>

        <button type="submit">Register</button>

        <p className="auxTextP">already have an account?</p>
        <p id="redirectP">login</p>
      </form>
    </>
  );
};
