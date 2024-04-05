import { Navigate, Outlet } from "react-router-dom";

export const RequireSignedIn = () => {
  if (localStorage.getItem("token")) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace />;
};
