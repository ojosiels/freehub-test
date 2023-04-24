import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import ListClientsPage from "../pages/ListClientsPage";

import ProtectedRoutes from "../components/ProtectedRoutes";

const RoutesMain = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoutes />}>
        <Route path="/main" element={<MainPage />} />
        <Route path="/clients" element={<ListClientsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesMain;
