import { useContext, useState } from "react";
import { iClientData } from "../../interfaces/client";

import ClientModal from "../ClientModal";
import AddClientModal from "../AddClientModal";
import "./style.css";

import { IoMdAdd } from "react-icons/io";
import { ClientContext } from "../../contexts/ClientContext";

interface iClientListProps {
  limiter?: number;
  clients: iClientData[];
}

const ClientList = ({ clients, limiter }: iClientListProps): JSX.Element => {
  const [clientInfo, setClientInfo] = useState<iClientData>(clients[0]);
  const [modalSwitch, setModalSwich] = useState<boolean>(false);
  const [addModalSwitch, setAddModalSwich] = useState<boolean>(false);

  const { searchClientByName } = useContext(ClientContext);

  if (clients.length == 0) {
    return (
      <>
        {addModalSwitch && <AddClientModal setIsModalOn={setAddModalSwich} />}
        <div className="clientNotFound">
          <button
            className="addClientButton"
            onClick={() => {
              setAddModalSwich(true);
            }}
          >
            <IoMdAdd />
          </button>
          <h1>Cliente não encontrados</h1>
          <button
            onClick={() => {
              searchClientByName("");
            }}
          >
            Listar Todos
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      {modalSwitch && (
        <ClientModal client={clientInfo} setIsModalOn={setModalSwich} />
      )}
      {addModalSwitch && <AddClientModal setIsModalOn={setAddModalSwich} />}

      <ul className="clientListUl">
        <li key={"f7550c22-8ec5-4d37-8cfb-eb9076989b9b"}>
          <button
            className="addClientButton"
            onClick={() => {
              setAddModalSwich(true);
            }}
          >
            <IoMdAdd />
          </button>
        </li>
        {clients.map((elem, index) => {
          if (limiter && index > limiter) {
            return <></>;
          }

          return (
            <li
              key={elem.id}
              className="clientCardLi"
              onClick={() => {
                setClientInfo(elem);
                setModalSwich(true);
              }}
            >
              <h3>{elem.name}</h3>
              <p
                className={
                  parseFloat(elem.family_income) > 2500
                    ? "clientClassC"
                    : parseFloat(elem.family_income) <= 980
                    ? "clientClassA"
                    : "clientClassB"
                }
              >
                R${elem.family_income.split(".")[0]}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ClientList;
