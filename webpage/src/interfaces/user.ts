export interface iUserData {
  id: number;
  name: string;
  email: string;
  username: string;
}

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
