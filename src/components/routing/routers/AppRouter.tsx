import CreateGroupPage from "components/views/CreateGroupPage.tsx";
import DashboardPage from "components/views/DashboardPage";
import GroupDetail from "components/views/GroupDetail.tsx";
import HabitDetail from "components/views/HabitDetail.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedPage from "../../views/FeedPage.tsx";
import GroupSettingsPage from "../../views/GroupSettingsPage.tsx";
import JoinGroupPage from "../../views/JoinGroupPage.tsx";
import LoginPage from "../../views/LoginPage";
import NotFoundPage from "../../views/NotFoundPage";
import ProfilePage from "../../views/ProfilePage.tsx";
import SignUpPage from "../../views/SignUpPage";
import WelcomePage from "../../views/WelcomePage";
import { RequireNotSignedIn } from "../routeProtectors/RequireNotSignedIn";
import { RequireSignedIn } from "../routeProtectors/RequireSignedIn";
import CodeInvitePage from "../../views/CodeInvitePage.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<RequireSignedIn />}>
          <Route path="/app" element={<DashboardPage />} />
        </Route>

        <Route path="/app/:groupId/settings" element={<GroupSettingsPage />} />

        <Route path="/app/newGroup" element={<CreateGroupPage />} />

        <Route path="/app/:groupId" element={<GroupDetail />} />

        <Route path="/app/:groupId/habit/:habitId" element={<HabitDetail />} />

        <Route path="/join" element={<JoinGroupPage />} />

        <Route path="/invite/:groupId" element={<CodeInvitePage />} />


        <Route path="/profile" element={<RequireSignedIn />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route path="/feed" element={<RequireSignedIn />}>
          <Route path="/feed" element={<FeedPage />} />
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
