import React from "react";
import "styles/views/WelcomePage.scss"
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="welcomePage">
      <div className="content">
        <div className="logo">
          <img src="/logo.png" alt="logo"/>
        </div>
        <div className="title">
          <h1>Welcome to RapidTracker !</h1>
          <h2>please login or register to continue</h2>
        </div>
        <div className="buttons">
          <button type="button" onClick={() => navigate("login")}>LOGIN</button>
          <button type="button" onClick={() => navigate("registration")}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;