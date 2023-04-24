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
      .min(2, { message: "Minimo de 2 caracteres" })
      .max(150, { message: "Máximo de 150 caracteres" }),
    password: z.string().min(8, { message: "Minimo de 8 caracteres" }),
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
          <label htmlFor="usernameInput">Nome de Usuário:</label>
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
          <label htmlFor="passwordInput">Senha:</label>
          <input
            id="passwordInput"
            type="password"
            required
            minLength={8}
            {...register("password")}
          />
          {errors.password ? <p>{errors.password.message}</p> : <br />}
        </div>

        <button type="submit">Entrar</button>

        <p className="auxTextP">ainda não possui uma conta?</p>
        <p
          id="redirectP"
          onClick={() => {
            setIsLoginFormOn(false);
          }}
        >
          faça seu cadastro
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
        .min(2, { message: "Minimo de 2 caracteres" })
        .max(150, { message: "Máximo de 150 caracteres" }),
      email: z
        .string()
        .email({ message: "Email inválido" })
        .max(50, { message: "Máximo de 50 caracteres" }),
      username: z
        .string()
        .min(2, { message: "Minimo de 2 caracteres" })
        .max(150, { message: "Máximo de 150 caracteres" }),
      password: z.string().min(8, { message: "Minimo de 8 caracteres" }),
      confirmPassword: z.string().min(8, { message: "Minimo de 8 caracteres" }),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "As senhas não conferem",
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
          Voltar
        </p>

        <h2>Faça seu Cadastro</h2>
        <div>
          <label htmlFor="nameInput">Nome:</label>
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
          <label htmlFor="usernameInput">Nome de Usuário:</label>
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
          <label htmlFor="passwordInput">Senha:</label>
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
          <label htmlFor="confirmPasswordInput">Confirmar Senha:</label>
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

        <button type="submit">Cadastrar</button>

        <p className="auxTextP">já possui uma conta?</p>
        <p id="redirectP">faça login</p>
      </form>
    </>
  );
};
