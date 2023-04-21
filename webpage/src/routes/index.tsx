import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";

import Header from "../components/Header";

const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesMain;
