import axios from "axios";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../components/ToastConfig";
import api from "../services/api";

import { iUserLoginData, iUserRegisterData } from "../interfaces/user";

import { iClientResponseData, iClientReport } from "../interfaces/client";

interface iUserProviderProps {
  children: ReactNode;
}

interface iUserContext {
  loginUser: (data: iUserLoginData) => Promise<void>;
  registerUser: (data: iUserRegisterData) => Promise<void>;
  clientsResponseData: iClientResponseData;
  setClientsResponseData: Dispatch<SetStateAction<iClientResponseData>>;
  clientReport: iClientReport;
  loading: boolean;
}
export const UserContext = createContext<iUserContext>({} as iUserContext);

export const UserProvider = ({ children }: iUserProviderProps): JSX.Element => {
  const [clientsResponseData, setClientsResponseData] =
    useState<iClientResponseData>({} as iClientResponseData);

  const [loading, setLoading] = useState<boolean>(true);
  const [clientReport, setClientReport] = useState<iClientReport>(
    {} as iClientReport
  );

  const navigate = useNavigate();

  const loginUser = async (data: iUserLoginData) => {
    try {
      const logUser = await api.post("/login/", data);
      api.defaults.headers.common.authorization = `Bearer ${logUser.data.access}`;

      window.localStorage.setItem("accessToken", logUser.data.access);
      window.localStorage.setItem("refreshToken", logUser.data.refresh);

      const getClientsData = await api.get("/clients/");
      setClientsResponseData(getClientsData.data);

      const getClientReport = await api.get("/report/");
      setClientReport(getClientReport.data);

      toastSuccess("Login efetuado com sucesso");

      navigate("/main", { replace: true });
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error.message);
      }
    }
  };

  const registerUser = async (data: iUserRegisterData) => {
    try {
      await api.post("/users/", data);
      toastSuccess("Cadastro Realizado Com Sucesso");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toastError(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");
    const loadUser = async () => {
      if (refreshToken) {
        try {
          const res = await api.post(`/refresh/`, {
            refresh: refreshToken,
          });
          window.localStorage.setItem("accessToken", res.data.access);

          api.defaults.headers.authorization = `Bearer ${res.data.access}`;

          const getClientsData = await api.get("/clients/");
          setClientsResponseData(getClientsData.data);

          const getClientReport = await api.get("/report/");
          setClientReport(getClientReport.data);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        clientsResponseData,
        setClientsResponseData,
        loginUser,
        registerUser,
        clientReport,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
