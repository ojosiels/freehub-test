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
          <h2>Clients' Report</h2>

          <div>
            <label htmlFor="timeSelect">Time interval:</label>
            <select
              onChange={(event) => {
                setTimeInterval(event.target.value as timeInterval);
              }}
              id="timeSelect"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="today">Today</option>
            </select>
          </div>
        </section>

        <section className="clientReportBody">
          <section className="whiteReportCard">
            <h3>Above average</h3>
            <p>{clientReport[timeInterval].high_income_clients}</p>
          </section>
          <section className="coloredReportCard">
            <h3>Class A</h3>
            <p>{clientReport[timeInterval].a_clients}</p>
          </section>
          <section className="coloredReportCard">
            <h3>Class B</h3>
            <p>{clientReport[timeInterval].b_clients}</p>
          </section>
          <section className="coloredReportCard">
            <h3>Class C</h3>
            <p>{clientReport[timeInterval].c_clients}</p>
          </section>
        </section>
      </section>

      <section className="clientListSection">
        <h2>Clients</h2>

        <ClientList clients={clientsResponseData.results} limiter={6} />

        <Link to={"/clients"} className="seeMoreButton">
          See more
        </Link>
      </section>
    </>
  );
};

export default MainPage;
