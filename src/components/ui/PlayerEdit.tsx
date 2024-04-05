import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api, handleError } from "helpers/api";
import { Spinner } from "components/ui/Spinner";
import BaseContainer from "components/ui/BaseContainer";
import "styles/ui/Game.scss";
import { Button } from "components/ui/Button";

const PlayerEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState("2000");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const editResponse = await api.get(`/allowEdit?id=${id}`, {
        headers: { Authorization: localStorage.getItem("token") },
      });
      if (!editResponse.data) {
        doReturn();
      }

      setIsLoading(true);
      try {
        const response = await api.get(`users/${id}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        const userData = response.data;
        setUser(userData); // Setze den gesamten User für die Anzeige
        setUsername(userData.username || ""); // Setze den Benutzernamen oder leer, wenn nicht vorhanden
        // Zerlege das birthdate, falls vorhanden
        // console.log(userData.birthdate);
        if (userData.birthdate === null) {
          // console.log("Birthdate is null.");
          // Set birthdate to a default value
          userData.birthdate = "2000-01-01";
        }
        if (userData.birthdate) {
          const [y, m, d] = userData.birthdate.split("-");
          setDay(d);
          setMonth(m);
          setYear(y);
        }
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
    navigate(`/game/player/${id}`);
  };

  const doSubmit = async () => {
    console.log("Submit changes");
    try {
      await api.put(
        `/users/${id}`,
        {
          username: username,
          birthdate: `${year}-${month}-${day}`,
        },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      console.log("Update successful");
      doReturn();
    } catch (error) {
      console.error(
        `Fehler beim Aktualisieren der Daten: ${handleError(error)}`
      );
      alert(
        "Fehler beim Aktualisieren der Daten. Siehe Konsole für mehr Informationen."
      );
    }
  };

  return (
    <BaseContainer className="game container">
      <h2>Edit User Details</h2>
      <div className="game">
        <ul className="game user-list">
          <li>
            Username:{" "}
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </li>
          <li>
            Birthdate:{" "}
            <select value={day} onChange={(e) => setDay(e.target.value)}>
              {Array.from({ length: 31 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={String(i + 1).padStart(2, "0")}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select value={year} onChange={(e) => setYear(e.target.value)}>
              {Array.from({ length: 101 }, (_, i) => (
                <option key={i} value={1920 + i}>
                  {1920 + i}
                </option>
              ))}
            </select>
          </li>
        </ul>
        <div className="buttons-container">
          <Button onClick={doReturn}>Cancel</Button>
          <Button onClick={doSubmit}>Submit</Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default PlayerEdit;
