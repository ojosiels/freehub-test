import { iUserData } from "./user";

export interface iClientData {
  id: number;
  name: string;
  cpf: string;
  family_income: string;
  birth_date: string;
  date_joined: string;
  user: iUserData | undefined;
}

export interface iClientRegisterData {
  name: string;
  cpf: string;
  family_income: string;
  birth_date: string;
}

export interface iClientResponseData {
  count: number;
  next: string | null;
  previous: string | null;
  results: iClientData[];
}

export interface iClientReport {
  month: {
    high_income_clients: number;
    a_clients: number;
    b_clients: number;
    c_clients: number;
  };
  week: {
    high_income_clients: number;
    a_clients: number;
    b_clients: number;
    c_clients: number;
  };
  day: {
    high_income_clients: number;
    a_clients: number;
    b_clients: number;
    c_clients: number;
  };
}
