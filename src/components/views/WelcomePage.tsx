import AuthContainer from "components/ui/AuthContainer";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import Logo from "components/ui/Logo";
import { useNavigate } from "react-router-dom";
import "styles/views/WelcomePage.scss";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <BaseContainer>
      <AuthContainer>
        <Logo />
        <div>
          <h1 className="text-xl lg:text-4xl font-bold">
            Welcome to RapidTracker
          </h1>
          <h2 className="text-slate-200 py-2 lg:py-4 lg:text-xl">
            Please login or register to continue
          </h2>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => navigate("login")}>Login</Button>
          <Button onClick={() => navigate("registration")}>Sign up</Button>
        </div>
      </AuthContainer>
    </BaseContainer>
  );
};

export default WelcomePage;
