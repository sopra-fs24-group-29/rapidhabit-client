import { useNavigate } from "react-router-dom";
import "styles/views/WelcomePage.scss";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="welcomePage">
      <div className="content">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <div className="title">
          <h1>Welcome to RapidTracker</h1>
          <h2>Please login or register to continue</h2>
        </div>
        <div className="buttons">
          <button type="button" onClick={() => navigate("login")}>
            Login
          </button>
          <button type="button" onClick={() => navigate("registration")}>
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
