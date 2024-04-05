import DashboardPage from "components/views/DashboardPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../../views/LoginPage";
import NotFoundPage from "../../views/NotFoundPage";
import SignUpPage from "../../views/SignUpPage";
import WelcomePage from "../../views/WelcomePage";
import { RequireNotSignedIn } from "../routeProtectors/RequireNotSignedIn";
import { RequireSignedIn } from "../routeProtectors/RequireSignedIn";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<RequireSignedIn />}>
          <Route
            path="/app"
            element={<Navigate to="/app/dashboard" replace />}
          />
          <Route path="/app/dashboard" element={<DashboardPage />} />
        </Route>

        <Route path="/login" element={<RequireNotSignedIn />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/registration" element={<RequireNotSignedIn />}>
          <Route path="/registration" element={<SignUpPage />} />
        </Route>
        <Route path="/" element={<RequireNotSignedIn />}>
          <Route path="/" element={<WelcomePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;