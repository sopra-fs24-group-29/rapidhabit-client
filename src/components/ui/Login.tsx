import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User"; // refers to an object defining the the structure of a user
import { useNavigate } from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/ui/Login.scss";
import BaseContainer from "components/ui/BaseContainer"; // UI-Wrapper, probably used for layout purposes
import PropTypes from "prop-types"; // ! I dont understand what this import is used for
import FormField from "components/ui/FormField";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const Login = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      console.log(requestBody);
      const response = await api.post("/login", requestBody);
      console.log(response.data);
      // Store the token into the local storage.
      localStorage.setItem("token", response.data);
      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/game");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const doRegister = async () => {
    try {
      navigate("/registration");
    } catch (error) {
      alert(
        `Something went wrong. Routing to registration menu failed. \n${handleError(
          error
        )}`
      );
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
                onClick={() => doLogin()}
              >
                Login
              </Button>
            </div>
            <div className="login button-container">
              <Button onClick={() => doRegister()}>Sign up</Button>
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
export default Login;
