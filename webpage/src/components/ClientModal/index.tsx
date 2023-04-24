import { useState, Dispatch, SetStateAction, useContext } from "react";
import { iClientData, iClientRegisterData } from "../../interfaces/client";

import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MdDeleteForever, MdEdit, MdClose } from "react-icons/md";

import "../../styles/BaseFormStyle.css";

import "./style.css";
import { ClientContext } from "../../contexts/ClientContext";

interface iClientModalProps {
  setIsModalOn: Dispatch<SetStateAction<boolean>>;
  client: iClientData;
}

const ClientModal = ({
  client,
  setIsModalOn,
}: iClientModalProps): JSX.Element => {
  const { updateClient, deleteClient } = useContext(ClientContext);

  const today = new Date().toISOString().split("T")[0];

  const [isEditOn, setIsEditOn] = useState(false);

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
      await updateClient(data, client.id);
      setIsModalOn(false);
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

        {isEditOn ? (
          <form onSubmit={handleSubmit(submitData)} className="clientForm">
            <div>
              <label htmlFor="nameInput">Nome:</label>
              <input
                id="nameInput"
                type="text"
                required
                minLength={2}
                maxLength={150}
                defaultValue={client.name}
                {...register("name")}
              />
              {errors.name ? <p>{errors.name.message}</p> : <br />}
            </div>

            <div>
              <label htmlFor="cpfInput">CPF:</label>
              <input
                id="cpfInput"
                type="text"
                required
                minLength={10}
                maxLength={10}
                defaultValue={client.cpf}
                {...register("cpf")}
              />
              {errors.cpf ? <p>{errors.cpf.message}</p> : <br />}
            </div>

            <div>
              <label htmlFor="family_incomeInput">Renda Familiar:</label>
              <input
                id="family_incomeInput"
                type="number"
                step={0.01}
                required
                min={0}
                max={999999}
                defaultValue={client.family_income}
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
                max={today}
                defaultValue={client.birth_date}
                {...register("birth_date")}
              />
            </div>

            <button type="submit">Salvar</button>
          </form>
        ) : (
          <div className="clientInfo">
            <p>
              <strong>Nome:</strong> {client.name}
            </p>

            <p>
              <strong>CPF:</strong> {client.cpf}
            </p>

            <p>
              <strong>Renda familiar:</strong> {client.family_income}
            </p>

            <p>
              <strong>Data de Nascimento:</strong> {client.birth_date}
            </p>

            <p>
              <strong>Data de Cadastro:</strong> {client.date_joined}
            </p>

            <p>
              <strong>Usuário Responsavél:</strong> {client.user?.email}
            </p>
          </div>
        )}
        <div className="buttonsDiv">
          <button
            onClick={() => {
              setTimeout(() => {
                setIsModalOn(false);
              }, 300);

              deleteClient(client.id);
            }}
            className="deleteButton"
          >
            <MdDeleteForever /> Excluir
          </button>
          <button
            onClick={() => {
              setIsEditOn(!isEditOn);
            }}
            className="editButton"
          >
            {isEditOn ? "Cancelar" : "Editar"} <MdEdit />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ClientModal;
