import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
const Stomp = require("@stomp/stompjs");

const FeedPage = () => {
  const [feedEntries, setFeedEntries] = useState([]);
  const [groupId, setGroupId] = useState("123");

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        Authorization: "hnXAYyVqZu7Vi1j8JUaw3uu-kpc",
      },
      onConnect: () => {
        console.log("Connected to WS");
        client.subscribe(`/topic/groups/${groupId}/feed`, (message) => {
          const newEntry = JSON.parse(message.body);
          setFeedEntries((prevEntries) => [newEntry, ...prevEntries]);
        });

        // Hier könntest du die initialen Feed-Daten vom Server anfordern.
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
  }, [groupId]);

  // Eine Funktion, um die ersten 20 Feed-Einträge zu laden
  const fetchInitialFeeds = async (groupId) => {
    const response = await fetch(
      `http://localhost:8080/api/group/${groupId}/feed`
    );
    const data = await response.json();
    setFeedEntries(data); // Stelle sicher, dass die Daten im richtigen Format sind
  };
};
