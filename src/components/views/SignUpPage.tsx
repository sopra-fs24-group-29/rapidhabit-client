import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/ui/FormField";
import { api } from "helpers/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContainer from "../ui/AuthContainer.tsx";
import Logo from "../ui/Logo.tsx";
import { Button } from "../ui/Button.tsx";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);

  const doRegistration = async () => {
    try {
      const requestBody = JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      });
      let response = await api.post("/users", requestBody);
      if (response.status === 201) {
        response = await api.post("/users/login", requestBody);
        localStorage.setItem("token", response.data);
        navigate("/app");
      } else if (response.status === 409) {
        // TODO: Show error message
        console.log("Email is already taken.", response.data);
      }
    } catch (error) {
      // TODO: Show generic error message
    }
  };

  return (
    <BaseContainer className="signUpPage">
      <AuthContainer>
        <Logo />
        <div className="content">
          <div className="login form">
            <h1>Create account</h1>
            <h3>Firstname</h3>
            <FormField
              type="text"
              label=""
              value={firstname}
              onChange={(un: string) => setFirstname(un)}
            />
            <h3>Lastname</h3>
            <FormField
              type="text"
              label=""
              value={lastname}
              onChange={(un: string) => setLastname(un)}
            />
            <h3>Email</h3>
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
                  disabled={!firstname || !lastname || !email || !password}
                  onClick={doRegistration}
                >
                  Create account
                </Button>
            </div>
          </div>
        </div>
      </AuthContainer>
    </BaseContainer>
  );
};

export default SignUpPage;
