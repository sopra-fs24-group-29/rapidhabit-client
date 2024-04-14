import DashboardPage from "components/views/DashboardPage";
import GroupDetail from "components/views/GroupDetail.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../views/LoginPage";
import NotFoundPage from "../../views/NotFoundPage";
import ProfilePage from "../../views/ProfilePage.tsx";
import SignUpPage from "../../views/SignUpPage";
import WelcomePage from "../../views/WelcomePage";
import { RequireNotSignedIn } from "../routeProtectors/RequireNotSignedIn";
import { RequireSignedIn } from "../routeProtectors/RequireSignedIn";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<RequireSignedIn />}>
          <Route path="/app" element={<DashboardPage />} />
        </Route>

        <Route path="/app/:groupId" element={<GroupDetail />} />

        <Route path="/profile/:userId" element={<RequireSignedIn />}>
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Route>

        <Route path="/login" element={<RequireNotSignedIn />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route path="/registration" element={<RequireNotSignedIn />}>
          <Route path="/registration" element={<SignUpPage />} />
        </Route>

        <Route path="/" element={<WelcomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
