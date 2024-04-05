import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import FormField from "components/ui/FormField";
import { api, handleError } from "helpers/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/ui/Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      const response = await api.post("/login", requestBody);

      localStorage.setItem("token", response.data);
      navigate("/dashboard");
    } catch (error) {
      alert(`Something went wrong during the login: \n${handleError(error)}`);
    }
  };

  const navigateToSignUp = async () => {
    navigate("/registration");
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
            onChange={(value) => setPassword(value)}
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
              <Button onClick={navigateToSignUp}>Sign up</Button>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Login;
