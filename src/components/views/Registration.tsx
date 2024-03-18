import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User"; // refers to an object defining the the structure of a user
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Login.scss";
import BaseContainer from "components/ui/BaseContainer"; // UI-Wrapper, probably used for layout purposes
import PropTypes from "prop-types"; // ! I dont understand what this import is used for
import FormField from "components/ui/FormField";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const doRegistration = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      console.log(requestBody);
      let response = await api.post("/users", requestBody);
      if (response.status === 201) {
        console.log("Registration successful", response.data);
        response = await api.post("/login", requestBody);
        console.log(response.data);
        localStorage.setItem("token", response.data);

        navigate("/game");
      } else if (response.status === 409) {
        // Der Statuscode 400 bedeutet eine fehlerhafte Anfrage
        console.log("Username is already taken.", response.data);
        // Behandle den Fehler, z.B. zeige eine Fehlermeldung an
      }
    } catch (error) {
      alert(`Username is already taken: \n${handleError(error)}`);
    }
  };

  const returnToLogin = async () => {
    try {
      navigate("/login");
    } catch (error) {
      alert("Something went wrong. Return to login screen failed.");
    }
  };

  return (
    <BaseContainer>
      <div className="login container">
        <div className="login form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />

          <FormField
            label="Password"
            value={password}
            onChange={(n) => setPassword(n)}
          />
          <div className="buttons-container">
            <div className="login button-container">
              <Button
                disabled={!username || !password}
                onClick={() => doRegistration()}
              >
                Sign up
              </Button>
            </div>
            <div className="login button-container">
              <Button onClick={() => returnToLogin()}>Back to login</Button>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Registration;
