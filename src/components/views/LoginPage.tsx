import FormField from "components/ui/FormField";
import { api, handleError } from "helpers/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "styles/views/LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  const performLogin = async () => {
    try {
      const requestBody = JSON.stringify({ email, password });
      const response = await api.post("/users/login", requestBody);

      localStorage.setItem("token", response.data);
      navigate("/home");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  return (
    <div className="loginPage">
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>
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
            <div className="login button-container">
              <button
                type="button"
                disabled={!email || !password}
                onClick={performLogin}
              >
                Login
              </button>
            </div>
          </div>
          <div className="nav">
            <Link to="/registration">Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
