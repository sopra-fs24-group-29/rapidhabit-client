import { Navigate, Outlet } from "react-router-dom";

export const RequireNotSignedIn = () => {
  if (!localStorage.getItem("token")) {
    return <Outlet />;
  }
  return <Navigate to="/app" replace />;
};
