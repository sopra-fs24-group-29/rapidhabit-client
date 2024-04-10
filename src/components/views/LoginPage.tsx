import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/ui/FormField";
import { api, handleError } from "helpers/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../ui/AuthContainer.tsx";
import Logo from "../ui/Logo.tsx";
import { Button } from "../ui/Button.tsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ email, password });
      const response = await api.post("/users/login", requestBody);

      localStorage.setItem("token", response.data);
      navigate("/app");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <BaseContainer>
      <AuthContainer>
        <Logo />
          <div className="content">
            <div className="login form">
              <h1>Login</h1>
              <h3>Email</h3>
              <FormField
                label=""
                type="email"
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
                <div
                  className="toggle password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? "/hide.png" : "/show.png"}
                    alt={showPassword ? "Hide" : "Show"}
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
              </div>
              <div className="buttons-container">
                <Button
                  type="button"
                  disabled={!email || !password}
                  onClick={doLogin}
                >
                  Login
                </Button>
              </div>
              <div className="nav">
                <Link to="/registration">Create account</Link>
              </div>
            </div>
          </div>
      </AuthContainer>
    </BaseContainer>
  );
};

export default LoginPage;
