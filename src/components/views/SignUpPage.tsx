import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import { useNavigate } from "react-router-dom";
import "styles/ui/Login.scss";
import FormField from "components/ui/FormField";
import "styles/views/SignUpPage.scss"

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const doRegistration = async () => {
    try {
      const requestBody = JSON.stringify({ firstname, lastname, email, password });
      console.log(requestBody);
      let response = await api.post("/users", requestBody);
      if (response.status === 201) {
        console.log("Registration successful", response.data);
        response = await api.post("/login", requestBody);
        console.log(response.data);
        localStorage.setItem("token", response.data);

        navigate("/home");
      } else if (response.status === 409) {
        // Der Statuscode 400 bedeutet eine fehlerhafte Anfrage
        console.log("Email is already taken.", response.data);
        // Behandle den Fehler, z.B. zeige eine Fehlermeldung an
      }
    } catch (error) {
      alert(`Email is already taken: \n${handleError(error)}`);
    }
  };

  return (
    <div className="signUpPage">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
      <div className="content">
        <div className="login form">
          <h1>Create account</h1>
          <h3>First name</h3>
          <FormField
            type="text"
            label=""
            value={firstname}
            onChange={(un: string) => setFirstname(un)}
          />
          <h3>Last name</h3>
          <FormField
            type="text"
            label=""
            value={lastname}
            onChange={(un: string) => setLastname(un)}
          />
          <h3>E-mail</h3>
          <FormField
            type="email"
            label=""
            value={email}
            onChange={(un: string) => setEmail(un)}
          />
          <h3>Password</h3>
          <div className="password-container">
            <FormField
              type={showPassword ? "text" : "password"}
              label=""
              value={password}
              onChange={(un: string) => setPassword(un)}
              className="password-input"
            />
            <div className="toggle password-toggle" onClick={() => setShowPassword(!showPassword)}>
              <img src={showPassword ? "/hide.png" : "/show.png"} alt={showPassword ? "Hide" : "Show"}
                   style={{ width: "24px", height: "24px" }} />
            </div>
          </div>
          <div className="buttons-container">
            <div className="login button-container">
              <button type="button"
                      disabled={!firstname || !lastname || !email || !password}
                      onClick={() => doRegistration()}>
                Create account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default SignUpPage;
