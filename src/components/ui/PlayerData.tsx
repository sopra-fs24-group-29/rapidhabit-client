import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import formatDateTime from "components/FormatDateTime";
import { Button } from "./Button";
import EditButton from "./EditButton";

const PlayerData = ({ user, attribute }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(user[attribute]);
  const attributeName = attribute.charAt(0).toUpperCase() + attribute.slice(1);

  const convertValues = (value) => {
    if (attribute === "creationDate" || attribute === "birthdate") {
      return value ? formatDateTime(value) : "Not specified";
    }

    return value;
  };

  const doEdit = () => {
    setIsEditing(true);
  };

  const saveEdit = () => {
    setIsEditing(false);
    console.log("Updated value:", editValue);
    console.log("Update an Backend schicken!");
  };

  const doReturn = async () => {
    navigate("/game");
  };

  user[attribute] = convertValues(user[attribute]);

  return (
    <div className="player container">
      <div className="player attribute">{`${attributeName}:`}</div>
      <div className="player name">{user[attribute]}</div>
    </div>
  );
};

PlayerData.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    status: PropTypes.string,
    // Ergänze andere mögliche Attribute hier
  }).isRequired,
  attribute: PropTypes.string.isRequired,
};

export default PlayerData;
