import { AxiosError } from "axios";
import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/ui/FormField";
import { api, handleError } from "helpers/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContainer from "../ui/AuthContainer.tsx";
import { Button } from "../ui/Button.tsx";
import Logo from "../ui/Logo.tsx";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const doRegistration = async () => {
    try {
      const requestBody = JSON.stringify({
        firstname,
        lastname,
        email,
        password,
      });
      const response = await api.post("/users", requestBody);
      if (response.status === 201) {
        await loginAfterSignUp(email, password);
        navigate("/app");
      }
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
  const loginAfterSignUp = async (email: string, password: string) => {
    const loginResponse = await api.put(
      "/users/login",
      JSON.stringify({ email, password })
    );
    const token = loginResponse.data.token;

    const profileResponse = await api.get("/users/profile", {
      headers: { Authorization: token },
    });
    const userId = profileResponse.data.id;

    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);
  };

  return (
    <BaseContainer>
      <AuthContainer>
        <Logo />
        <div>
          <div>
            <h1 className="text-left text-2xl lg:text-4xl">Create account</h1>
            <h3 className="text-left  mt-3">Firstname</h3>
            <FormField
              type="text"
              label=""
              maxLength={20}
              value={firstname}
              onChange={(un: string) => setFirstname(un)}
            />
            <h3 className="text-left  mt-3">Lastname</h3>
            <FormField
              type="text"
              label=""
              maxLength={20}
              value={lastname}
              onChange={(un: string) => setLastname(un)}
            />
            <h3 className="text-left  mt-3">Email</h3>
            <FormField
              type="email"
              label=""
              maxLength={50}
              value={email}
              onChange={(un: string) => setEmail(un)}
            />
            <h3 className="text-left  mt-3">Password</h3>
            <div className="relative">
              <FormField
                type={showPassword ? "text" : "password"}
                label=""
                maxLength={20}
                value={password}
                onChange={(un: string) => setPassword(un.replace(/\s/g, ''))}
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
                disabled={!firstname || !lastname || !email || !password}
                onClick={doRegistration}
                tint="accent"
              >
                Create account
              </Button>
            </div>
            <div className="mt-5 hover:underline">
              <Link to="/login">Login</Link>
            </div>
          </div>
        </div>
      </AuthContainer>
    </BaseContainer>
  );
};

export default SignUpPage;
