import { AxiosError } from "axios";
import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/ui/FormField";
import { api, handleError } from "helpers/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../ui/AuthContainer.tsx";
import { Button } from "../ui/Button.tsx";
import Logo from "../ui/Logo.tsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const doLogin = async () => {
    try {
      const requestBody = JSON.stringify({ email, password });

      const loginResponse = await api.put("/users/login", requestBody);
      const token = loginResponse.data.token;

      const profileResponse = await api.get("/users/profile", {
        headers: { Authorization: token },
      });
      const userId = profileResponse.data.id;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      navigate("/app");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(
          error.response?.data.message ?? "An unexpected error occurred"
        );
      } else {
        alert(
          `Something went wrong during the registration: \n${handleError(
            error
          )}`
        );
      }
    }
  };

  return (
    <BaseContainer>
      <AuthContainer>
        <Logo />
        <div>
          <div>
            <h1 className="text-left text-2xl lg:text-4xl">Login</h1>
            <h3 className="text-left mt-3">Email</h3>
            <FormField
              label=""
              type="email"
              value={email}
              onChange={(un: string) => setEmail(un)}
            />
            <h3 className="text-left mt-3">Password</h3>
            <div className="relative">
              <FormField
                type={showPassword ? "text" : "password"}
                label=""
                value={password}
                onChange={(un: string) => setPassword(un)}
              />
              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  className="cursor-pointer"
                  src={showPassword ? "/hide.png" : "/show.png"}
                  alt={showPassword ? "Hide" : "Show"}
                  style={{ width: "24px", height: "24px" }}
                />
              </div>
            </div>
            {errorMessage && (
              <div className="font-semibold text-accent">{errorMessage}</div>
            )}
            <div>
              <Button
                className="cursor-pointer py-1 px-4 mt-5 w-full"
                type="button"
                disabled={!email || !password}
                onClick={doLogin}
                tint="accent"
              >
                Login
              </Button>
            </div>
            <div className="mt-5 hover:underline">
              <Link to="/registration">Create account</Link>
            </div>
          </div>
        </div>
      </AuthContainer>
    </BaseContainer>
  );
};

export default LoginPage;
