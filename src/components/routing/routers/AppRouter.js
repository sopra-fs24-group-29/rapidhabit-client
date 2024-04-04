import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginGuard } from "../routeProtectors/LoginGuard";
import Login from "../../views/Login";
import { RegistrationGuard } from "../routeProtectors/RegistrationGuard";
import Registration from "../../views/Registration";
import WelcomePage from "../../ui/WelcomePage";
import NotFoundPage from "../../ui/NotFoundPage";

/**
 * Main router of your application.
 * In the following class, different routes are rendered. In our case, there is a Login Route with matches the path "/login"
 * and another Router that matches the route "/game".
 * The main difference between these two routes is the following:
 * /login renders another component without any sub-route
 * /game renders a Router that contains other sub-routes that render in turn other react components
 * Documentation about routing in React: https://reactrouter.com/en/main/start/tutorial
 */

/** BrowserRouter: Ein Router, der die HTML5-History-API verwendet, um die UI mit der URL zu synchronisieren. (Umfasst alle Routen)
 * Routes: Ein Container für due Route-Definitionen. Er ersetzt den älteren Switch-Komponenten und sorgt dafür, dass nur eine Route gleichzeitig gerendert wird – die, die mit der aktuellen URL übereinstimmt.
 * Route: Definiert eine einzelne Route mit einem Pfad und der zugehörigen Komponente.
 */

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginGuard />}>
          <Route path="" element={<Login />} />
        </Route>

        <Route path="/registration" element={<RegistrationGuard />}>
          <Route path="" element={<Registration />} />
        </Route>

        <Route path="/" element={<WelcomePage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

/*
 * Don't forget to export your component!
 */
export default AppRouter;
