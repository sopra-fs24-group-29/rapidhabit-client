import BaseContainer from "components/ui/BaseContainer";
import FormField from "components/ui/FormField";
import { api, handleError } from "helpers/api";
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
        password
      });
      let response = await api.post("/users", requestBody);
      if (response.status === 201) {
        response = await api.put("/users/login", requestBody);
        localStorage.setItem("token", response.data.token);
        console.log("successful registration");
        navigate("/app");
      } else if (response.status === 409) {
        console.log("Email is already taken.", response.data);
        alert("Email is already taken.");
      }
    } catch (error) {
      console.log("something went wrong", error);
      alert(`Something went wrong during the signup: \n${handleError(error)}`);
    }
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
              value={firstname}
              onChange={(un: string) => setFirstname(un)}
            />
            <h3 className="text-left  mt-3">Lastname</h3>
            <FormField
              type="text"
              label=""
              value={lastname}
              onChange={(un: string) => setLastname(un)}
            />
            <h3 className="text-left  mt-3">Email</h3>
            <FormField
              type="email"
              label=""
              value={email}
              onChange={(un: string) => setEmail(un)}
            />
            <h3 className="text-left  mt-3">Password</h3>
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
            <div>
                <Button
                  className="cursor-pointer py-1 px-4 mt-5 w-full"
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
