import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import FormField from "components/ui/FormField";
import { api } from "helpers/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "styles/ui/Login.scss";

const Registration = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const registerUser = async () => {
    try {
      const requestBody = JSON.stringify({ username, password });
      let response = await api.post("/users", requestBody);

      if (response.status === 201) {
        response = await api.post("/login", requestBody);
        localStorage.setItem("token", response.data);
        navigate("/game");
      } else if (response.status === 409) {
        // TODO: Display error message properly
        console.log("Username is already taken.", response.data);
      }
    } catch (error) {
      // TODO: Dispaly generic error message
    }
  };

  const returnToLogin = () => navigate("/login");

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
                onClick={() => registerUser()}
              >
                Sign up
              </Button>
            </div>
            <div className="login button-container">
              <Button onClick={returnToLogin}>Back to login</Button>
            </div>
          </div>
        </div>
      </div>
    </BaseContainer>
  );
};

export default Registration;
