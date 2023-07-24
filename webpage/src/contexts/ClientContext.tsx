import axios from "axios";

import { createContext, ReactNode, useContext } from "react";
import { toastError, toastSuccess } from "../components/ToastConfig";
import api from "../services/api";
import { UserContext } from "./UserContext";

import {
  iClientData,
  iClientResponseData,
  iClientRegisterData,
} from "../interfaces/client";

interface iClientProviderProps {
  children: ReactNode;
}

interface iClientContext {
  registerClient: (data: iClientRegisterData) => Promise<void>;
  deleteClient: (clientId: number) => Promise<void>;
  updateClient: (
    data: iClientRegisterData,
    clientId: number
  ) => Promise<iClientData>;
  searchClientByName: (clientName: string) => Promise<void>;
  searchClientByFamilyIncome: (family_income: string) => Promise<void>;
  changeClientPage: (link: string) => Promise<void>;
}
export const ClientContext = createContext<iClientContext>(
  {} as iClientContext
);

export const ClientProvider = ({
  children,
}: iClientProviderProps): JSX.Element => {
  const { clientsResponseData, setClientsResponseData } =
    useContext(UserContext);

  const registerClient = async (data: iClientRegisterData) => {
    try {
      const res = await api.post("/clients/", data);
      toastSuccess("Client Registered Successfully");

      const newClientsResponseData: iClientResponseData = {
        ...clientsResponseData,
        results: [...clientsResponseData.results, res.data],
      };

      setClientsResponseData(newClientsResponseData);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError("CPF: " + error.response?.data.cpf[0]);
        toastError("Birth Day: " + error.response?.data.birth_date[0]);
      }
    }
  };

  const deleteClient = async (clientId: number) => {
    try {
      await api.delete(`/clients/${clientId}/`);

      const newClientsResponseData = clientsResponseData.results.filter(
        (client: iClientData) => client.id !== clientId
      );

      setClientsResponseData({
        ...clientsResponseData,
        results: newClientsResponseData,
      });

      toastSuccess("Client Deleted Successfully");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error.response?.data.detail);
      }
    }
  };

  const updateClient = async (data: iClientRegisterData, clientId: number) => {
    try {
      const res = await api.patch(`/clients/${clientId}/`, data);
      toastSuccess("Client Edited Successfully");

      let clientIndex = 0;

      clientsResponseData.results.forEach((elem, index) => {
        if (elem.id == res.data.id) {
          clientIndex = index;
        }
      });

      clientsResponseData.results.splice(clientIndex, 1, res.data);

      const newClientsResponseData: iClientResponseData = {
        ...clientsResponseData,
        results: clientsResponseData.results,
      };

      setClientsResponseData(newClientsResponseData);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError("CPF: " + error.response?.data.cpf[0]);
        toastError("Birth Date: " + error.response?.data.birth_date[0]);
      }
    }
  };

  const searchClientByName = async (clientName: string) => {
    try {
      const res = await api.get(`/clients?name=${clientName}`);

      setClientsResponseData(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error.response?.data.detail);
      }
    }
  };

  const searchClientByFamilyIncome = async (family_income: string) => {
    try {
      const res = await api.get(`/clients?family_income=${family_income}`);

      setClientsResponseData(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error.response?.data.detail);
      }
    }
  };

  const changeClientPage = async (link: string) => {
    try {
      const res = await api.get(link);

      setClientsResponseData(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error.response?.data.detail);
      }
    }
  };

  return (
    <ClientContext.Provider
      value={{
        registerClient,
        deleteClient,
        updateClient,
        searchClientByName,
        searchClientByFamilyIncome,
        changeClientPage,
      }}
    >
      {children}
    </ClientContext.Provider>
  );
};
