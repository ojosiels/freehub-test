import Header from "../../components/Header";
import ClientList from "../../components/ClientList";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "./style.css";
import { ClientContext } from "../../contexts/ClientContext";
import Loader from "../../components/Loader";

const ListClientsPage = (): JSX.Element => {
  const { clientsResponseData, loading } = useContext(UserContext);
  const { changeClientPage } = useContext(ClientContext);

  const [pageLinkPrevious, setPageLinkPrevious] = useState<string>("/clients/");
  const [pageLinkNext, setPageLinkNext] = useState<string>("/clients/");

  const [isPreviousButtonOn, setIsPreviousButtonOn] = useState<boolean>(true);
  const [isNextButtonOn, setIsNextButtonOn] = useState<boolean>(true);

  const previousPage = async () => {
    changeClientPage(pageLinkPrevious);
  };

  const nextPage = async () => {
    changeClientPage(pageLinkNext);
  };

  useEffect(() => {
    if (clientsResponseData.previous) {
      setPageLinkPrevious(clientsResponseData.previous);
      setIsPreviousButtonOn(true);
    } else {
      setPageLinkPrevious("");
      setIsPreviousButtonOn(false);
    }

    if (clientsResponseData.next) {
      setPageLinkNext(clientsResponseData.next);
      setIsNextButtonOn(true);
    } else {
      setPageLinkNext("");
      setIsNextButtonOn(false);
    }
  }, [clientsResponseData]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div className="changePageDiv">
        <button
          disabled={!isPreviousButtonOn}
          onClick={() => {
            previousPage();
          }}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          disabled={!isNextButtonOn}
          onClick={() => {
            nextPage();
          }}
        >
          <AiOutlineArrowRight />
        </button>
      </div>
      <ClientList clients={clientsResponseData.results} />
    </>
  );
};

export default ListClientsPage;
