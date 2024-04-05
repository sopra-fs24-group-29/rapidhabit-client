import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Game from "../../ui/Game";
import PropTypes from "prop-types";
import Player from "components/views/Player";
import PlayerEdit from "components/views/PlayerEdit"; // Importiere die PlayerEdit Komponente

const GameRouter = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Routes>
        <Route path="" element={<Game />} />
        <Route path="dashboard" element={<Game />} />
        <Route path="player/:id" element={<Player />} />
        <Route path="playeredit/:id" element={<PlayerEdit />} />{" "}
        {/* Ändere die Route, um eine ID zu akzeptieren */}
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  );
};

GameRouter.propTypes = {
  base: PropTypes.string,
};

export default GameRouter;
