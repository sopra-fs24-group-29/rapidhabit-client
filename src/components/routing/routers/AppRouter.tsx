import CreateGroupPage from "components/views/CreateGroupPage.tsx";
import CreateHabitPage from "components/views/CreateHabitPage.tsx";
import DashboardPage from "components/views/DashboardPage";
import GroupDetail from "components/views/GroupDetail.tsx";
import HabitDetail from "components/views/HabitDetail.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CodeInvitePage from "../../views/CodeInvitePage.tsx";
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
import UpdateHabitPage from "../../views/UpdateHabitPage.tsx";
import UpdateGroupPage from "../../views/UpdateGroupPage.tsx";
import DeleteGroupPage from "../../views/DeleteGroupPage.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/app" element={<RequireSignedIn />}>
          <Route path="/app" element={<DashboardPage />} />
        </Route>

        <Route path="/app/:groupId/create-habit" element={<RequireSignedIn />}>
          <Route path="/app/:groupId/create-habit" element={<CreateHabitPage />} />
        </Route>

        <Route path="/app/:groupId/update-habit/:habitId" element={<RequireSignedIn />}>
          <Route path="/app/:groupId/update-habit/:habitId" element={<UpdateHabitPage />} />
        </Route>

        <Route path="/app/:groupId/update-group" element={<RequireSignedIn />}>
          <Route path="/app/:groupId/update-group" element={<UpdateGroupPage />} />
        </Route>

        <Route path="/app/:groupId/delete-group" element={<RequireSignedIn />}>
          <Route path="/app/:groupId/delete-group" element={<DeleteGroupPage />} />
        </Route>

        <Route path="/app/:groupId/settings" element={<RequireSignedIn />}>
          <Route path="/app/:groupId/settings" element={<GroupSettingsPage />} />
        </Route>

        <Route path="/app/new-group" element={<RequireSignedIn />}>
          <Route path="/app/new-group" element={<CreateGroupPage />} />
        </Route>

        <Route path="/app/:groupId" element={<RequireSignedIn />}>
          <Route path="/app/:groupId" element={<GroupDetail />} />
        </Route>

        <Route path="/app/:groupId/habit/:habitId" element={<RequireSignedIn />}>
          <Route path="/app/:groupId/habit/:habitId" element={<HabitDetail />} />
        </Route>

        <Route path="/join" element={<RequireSignedIn />}>
          <Route path="/join" element={<JoinGroupPage />} />
        </Route>

        <Route path="/invite/:groupId" element={<RequireSignedIn />}>
          <Route path="/invite/:groupId" element={<CodeInvitePage />} />
        </Route>

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
