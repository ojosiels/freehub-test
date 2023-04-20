export interface iUserRegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

export interface iUserLoginData {
  username: string;
  password: string;
}

export interface iClientFormData {
  name: string;
  cpf: string;
  family_income: string;
  birth_date: string;
}
