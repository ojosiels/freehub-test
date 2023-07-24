import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ClientContext } from "../../contexts/ClientContext";

import { AiFillHome } from "react-icons/ai";
import { BiLogOut, BiSearch } from "react-icons/bi";
import "./style.css";

const Header = (): JSX.Element => {
  const [clientParam, setClientParam] = useState<string>("");

  const { searchClientByName, searchClientByFamilyIncome } =
    useContext(ClientContext);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate("/clients");

    const parsedParam = parseFloat(clientParam);

    if (parsedParam) {
      searchClientByFamilyIncome(clientParam);
    } else {
      await searchClientByName(clientParam);
    }
  };

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("refreshToken");
    navigate("/");
  };

  const goToMain = async () => {
    await searchClientByName("");
  };

  return (
    <>
      <header className="headerComponentContainer">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
        >
          <input
            type="text"
            placeholder="search by client or income..."
            minLength={2}
            maxLength={150}
            onChange={(event) => {
              setClientParam(event.target.value);
            }}
          />
          <button type="submit">
            <BiSearch />
          </button>
        </form>
        <div className="navButtonsDiv">
          <button
            onClick={() => {
              logout();
            }}
          >
            <BiLogOut />
          </button>
          <Link
            onClick={() => {
              goToMain();
            }}
            to={"/main"}
          >
            <AiFillHome />
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
