import { useState } from "react";
import { LoginUserForm, RegisterUserForm } from "./HomeForms";

import "./style.css";

const HomePage = () => {
  const [isLoginFormOn, setIsLoginFormOn] = useState<boolean>(true);

  return (
    <div className="homePageContainer">
      <h1>The Company</h1>
      {isLoginFormOn ? (
        <LoginUserForm setIsLoginFormOn={setIsLoginFormOn} />
      ) : (
        <RegisterUserForm setIsLoginFormOn={setIsLoginFormOn} />
      )}
    </div>
  );
};

export default HomePage;
