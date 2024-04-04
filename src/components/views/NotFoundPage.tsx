import React from "react";
import "styles/views/NotFoundPage.scss"
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="notFoundPage">
      <div className="content">
        <h1 onClick={() => navigate("/")}>Error 404</h1>
        <h2>Page Not Found</h2>
        <p>The page you&apos;re looking for does not seem to exist</p>
      </div>
    </div>
  );
}

export default NotFoundPage;