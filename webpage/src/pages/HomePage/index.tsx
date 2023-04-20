import { useState } from "react";
import { LoginUserForm, RegisterUserForm } from "./HomeForms";

import "./style.css";
const HomePage = () => {
  const [isLoginFormOn, setIsLoginFormOn] = useState<boolean>(false);

  return (
    <div className="homePageContainer">
      <h1>A Empresa</h1>
      {isLoginFormOn ? (
        <LoginUserForm setIsLoginFormOn={setIsLoginFormOn} />
      ) : (
        <RegisterUserForm setIsLoginFormOn={setIsLoginFormOn} />
      )}
    </div>
  );
};

export default HomePage;
