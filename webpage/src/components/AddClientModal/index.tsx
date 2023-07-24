import { Dispatch, SetStateAction, useContext } from "react";
import { iClientRegisterData } from "../../interfaces/client";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MdClose } from "react-icons/md";

import "../../styles/BaseFormStyle.css";

import "./style.css";
import { ClientContext } from "../../contexts/ClientContext";

interface iAddClientModalProps {
  setIsModalOn: Dispatch<SetStateAction<boolean>>;
}

const AddClientModal = ({
  setIsModalOn,
}: iAddClientModalProps): JSX.Element => {
  const { registerClient } = useContext(ClientContext);

  const today = new Date().toISOString().split("T")[0];

  const formSchema: ZodType<iClientRegisterData> = z.object({
    name: z
      .string()
      .min(2, { message: "Minimo de 2 caracteres" })
      .max(150, { message: "Máximo de 150 caracteres" }),
    cpf: z
      .string()
      .min(10, { message: "Necessário 10 digitos" })
      .max(10, { message: "Apenas 10 digitos" }),
    family_income: z
      .string()
      .min(0, { message: "A renda não pode ser um valor negativo" })
      .max(999999, { message: "Máximo de 150 caracteres" }),
    birth_date: z.string(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<iClientRegisterData>({ resolver: zodResolver(formSchema) });

  const submitData = async (data: iClientRegisterData) => {
    try {
      await registerClient(data);
      setTimeout(() => {
        setIsModalOn(false);
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="modalContainer">
      <section className="modalBody">
        <button
          className="closeButton"
          onClick={() => {
            setIsModalOn(false);
          }}
        >
          <MdClose />
        </button>

        <form onSubmit={handleSubmit(submitData)} className="clientForm">
          <div>
            <label htmlFor="nameInput">Name:</label>
            <input
              required
              minLength={2}
              maxLength={150}
              id="nameInput"
              type="text"
              {...register("name")}
            />
            {errors.name ? <p>{errors.name.message}</p> : <br />}
          </div>

          <div>
            <label htmlFor="cpfInput">CPF:</label>
            <input
              required
              minLength={10}
              maxLength={10}
              id="cpfInput"
              type="text"
              {...register("cpf")}
            />
            {errors.cpf ? <p>{errors.cpf.message}</p> : <br />}
          </div>

          <div>
            <label htmlFor="family_incomeInput">Renda Familiar:</label>
            <input
              id="family_incomeInput"
              type="number"
              required
              min={0}
              max={999999}
              step={0.01}
              {...register("family_income")}
            />
            {errors.family_income ? (
              <p>{errors.family_income.message}</p>
            ) : (
              <br />
            )}
          </div>

          <div>
            <label htmlFor="birth_dateInput">Data de Nascimento:</label>
            <input
              id="birth_dateInput"
              type="date"
              required
              max={today}
              {...register("birth_date")}
            />
          </div>

          <button type="submit">Adicionar</button>
        </form>
      </section>
    </div>
  );
};

export default AddClientModal;
