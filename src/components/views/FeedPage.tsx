import { Client } from "@stomp/stompjs";
import { useEffect, useState } from "react";

const FeedPage = () => {
  const [feedEntries, setFeedEntries] = useState([]);
  const [groupId, setGroupId] = useState("6625588357aba20834ece611");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const stompClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `${token}`,
      },
      debug: function (str) {
        console.log(str);
      },
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WS");
        subscribeToFeed(stompClient);
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const subscribeToFeed = (client: Client) => {
    client.subscribe(`/topic/groups/${groupId}/feed`, (message) => {
      const newEntry = JSON.parse(message.body);
      console.log("Neue Nachricht erhalten:", newEntry); // Druckt die empfangene Nachricht aus
      // setFeedEntries((prevEntries) => [...prevEntries, newEntry]);
    });
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
