import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Game.scss";
import User from "models/User";
import PlayerData from "components/ui/PlayerData";
import { Button } from "components/ui/Button";
import EditButton from "components/ui/EditButton";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const userResponse = await api.get(`/users/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUser(new User(userResponse.data));

        const editResponse = await api.get(`/allowEdit?id=${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setIsEditable(editResponse.data);
      } catch (error) {
        console.error(`Error fetching data: ${handleError(error)}`);
        alert("Error fetching data. Check console for more information.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const doReturn = () => {
    navigate("/game");
  };

  const doEdit = () => {
    navigate(`/game/playeredit/${id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    return <div className="player-details">User not found</div>;
  }

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
        <div className="buttons-container">
          <Button onClick={doReturn}>Return</Button>
          <EditButton editFunction={doEdit} allowEdit={isEditable} />
        </div>
      </div>
    </BaseContainer>
  );
};

export default Player;
