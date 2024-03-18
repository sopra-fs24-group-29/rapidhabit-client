import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const PlayerField = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="player container">
      <div
        className="player attribute"
        onClick={() => navigate(`/game/player/${user.id}`)}
        style={{ cursor: "pointer" }}
      >
        {user.username}
      </div>
      <div className="player value">{user.status}</div>
    </div>
  );
};

PlayerField.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string,
  }).isRequired,
};

export default PlayerField;
