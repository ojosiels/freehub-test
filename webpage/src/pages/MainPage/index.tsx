import { useContext, useState } from "react";
import Header from "../../components/Header";

import "./style.css";

import ClientList from "../../components/ClientList";

import { Link } from "react-router-dom";

import { UserContext } from "../../contexts/UserContext";
import Loader from "../../components/Loader";

type timeInterval = "month" | "week" | "day";

const MainPage = (): JSX.Element => {
  const [timeInterval, setTimeInterval] = useState<timeInterval>("month");

  const { clientsResponseData, clientReport, loading } =
    useContext(UserContext);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />

      <section className="clientReportSection">
        <section className="clientReportHead">
          <h2>Relatório dos Clientes</h2>

          <div>
            <label htmlFor="timeSelect">Intervalo de tempo:</label>
            <select
              onChange={(event) => {
                setTimeInterval(event.target.value as timeInterval);
              }}
              id="timeSelect"
            >
              <option value="month">Mês</option>
              <option value="week">Semana</option>
              <option value="today">Dia</option>
            </select>
          </div>
        </section>

        <section className="clientReportBody">
          <section className="whiteReportCard">
            <h3>Acima da Média</h3>
            <p>{clientReport[timeInterval].high_income_clients}</p>
          </section>
          <section className="coloredReportCard">
            <h3>Classe A</h3>
            <p>{clientReport[timeInterval].a_clients}</p>
          </section>
          <section className="coloredReportCard">
            <h3>Classe B</h3>
            <p>{clientReport[timeInterval].b_clients}</p>
          </section>
          <section className="coloredReportCard">
            <h3>Classe C</h3>
            <p>{clientReport[timeInterval].c_clients}</p>
          </section>
        </section>
      </section>

      <section className="clientListSection">
        <h2>Clientes</h2>

        <ClientList clients={clientsResponseData.results} limiter={6} />

        <Link to={"/clients"} className="seeMoreButton">
          Ver Mais
        </Link>
      </section>
    </>
  );
};

export default MainPage;
