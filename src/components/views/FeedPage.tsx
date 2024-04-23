import { Client } from "@stomp/stompjs";
import BaseContainer from "components/ui/BaseContainer";
import FeedBox from "components/ui/FeedBox";
import TabBar from "components/ui/Tabbar";
import { useEffect, useState } from "react";

const FeedPage = () => {
  const [feedEntries, setFeedEntries] = useState<string[]>([]);

  // TODO: Make independent of group id once possible in backend
  const groupId = "6625588357aba20834ece611";

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
      setFeedEntries((prevEntries) => [...prevEntries, newEntry]);
    });
  };

  return (
    <div>
      <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">
          <div className="w-full px-8 pb-40">
            <h1 className="text-center text-4xl flex items-start font-bold pb-10">
              Feed
            </h1>
            {feedEntries.map((entry) => (
              // TODO: Get correct group here and a stable id for the key
              <FeedBox group={"G3"} color={"bg-green-500"} p1={entry} />
            ))}
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default FeedPage;
