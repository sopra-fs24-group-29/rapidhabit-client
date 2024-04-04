import React from "react";
import "styles/views/WelcomePage.scss"

const WelcomePage = () => {
  return (
    <div className="page">
      <div className="logo">
        <img src="/logo.png" alt="logo"/>
      </div>
      <div className="title">
        <h1>Welcome to RapidTracker!</h1>
        <h2>please login or register to continue</h2>
      </div>
      <div className="buttons">
        <button type="button">Login!</button>
        <button type="button">Register!</button>
      </div>
    </div>
  );
}

export default WelcomePage;