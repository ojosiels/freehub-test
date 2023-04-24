import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const refreshToken = localStorage.getItem("refreshToken");

  return <>{refreshToken ? <Outlet /> : <Navigate to="/" />}</>;
};

export default ProtectedRoutes;
