import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const FeedPage = () => {
  const [feedEntries, setFeedEntries] = useState([]);
  const [groupId, setGroupId] = useState("123");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: "" + token,
      },
      onConnect: () => {
        console.log("Connected to WS");
        client.subscribe(`/topic/groups/${groupId}/feed`, (message) => {
          const newEntry = JSON.parse(message.body);
          setFeedEntries((prevEntries) => prevEntries.concat(newEntry));
        });
        fetchInitialFeeds(groupId);
      },
      onDisconnect: () => {
        console.log("Disconnected from WS");
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [groupId]); // Stelle sicher, dass alle relevanten Abhängigkeiten hier aufgeführt sind

  const fetchInitialFeeds = async (groupId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/group/${groupId}/feed`
      );
      const data = await response.json();
      setFeedEntries(data);
    } catch (error) {
      console.error("Failed to fetch initial feeds:", error);
    }
  };

  return (
    <div>
      {feedEntries.map((entry, index) => (
        <div key={index}>
          <p>{entry}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
