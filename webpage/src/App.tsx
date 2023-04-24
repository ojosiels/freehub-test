import Routes from "./routes";
import "./styles/GlobalStyles.css";
import { ToastContainer } from "react-toastify";

const App = (): JSX.Element => {
  return (
    <>
      <Routes />
      <ToastContainer limit={3} pauseOnHover />
    </>
  );
};

export default App;
