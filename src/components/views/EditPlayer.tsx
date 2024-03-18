import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importiere useNavigate
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import User from "models/User";
import PlayerData from "components/ui/PlayerData";
import { Button } from "components/ui/Button";

const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialisiere useNavigate
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const response = await api.get(`/users/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        const userData = new User(response.data); // Erstelle eine neue User-Instanz
        setUser(userData);
        console.log(response.data);
        console.log(user);
      } catch (error) {
        console.error(`Error fetching user details: ${handleError(error)}`);
        alert(
          "Error fetching user details. Check console for more information."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const doReturn = () => {
    // Entferne async, wenn du keine asynchronen Operationen ausführst
    navigate("/game");
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <div className="player-details">User not found</div>;
  }
  let content = <Spinner />;
  content = (
    <div className="game">
      <ul className="game user-list">
        <li className="detail">Username: {user.username}</li>
        <li className="detail">Status: {user.status}</li>
        <li className="detail">Creation Date: {user.creationDate}</li>
        <li className="detail">Birthdate: {user.birthdate}</li>
      </ul>
    </div>
  );

  return (
    <BaseContainer className="game container">
      <h2>User Details</h2>
      <div className="game">
        <ul className="game user-list">
          <PlayerData user={user} attribute="username" />
          <PlayerData user={user} attribute="status" />
          <PlayerData user={user} attribute="creationDate" />
          <PlayerData user={user} attribute="birthdate" />
        </ul>
      </div>
      <div className="login button-container">
        <Button onClick={() => doReturn()}>Return</Button>
      </div>
    </BaseContainer>
  );
};

export default EditPlayer;
