import { Client } from "@stomp/stompjs";
import { api } from "helpers/api";
import { Group } from "models/Group";
import { oldChat } from "models/oldChat";
import { useEffect, useRef, useState } from "react";
import BaseContainer from "./BaseContainer";
import { Button } from "./Button";
import ChatBubble from "./ChatBubble";

interface ChatTabProps {
  group: Group;
}

const ChatTab = ({ group }: ChatTabProps) => {
  const [oldChats, setOldChats] = useState<oldChat[]>([]);
  const [message, setMessage] = useState<string>("");
  const [chatEntry, setChatEntry] = useState<oldChat[]>([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token")!;
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    const fetchOldChats = async () => {
      try {
        const response = await api.get(`/groups/${group.id}/chat`, {
          headers: { Authorization: token },
        });
        setOldChats(response.data || []);
        console.log(oldChats);
      } catch (error) {
        console.error("Error fetching group ids:", error);
      }
    };
    fetchOldChats();
  }, [group.id, token]);

  useEffect(() => {
    stompClient.current = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: token,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WS");
        stompClient.current!.subscribe(
          `/topic/groups/${group.id}/chat`,
          (message) => {
            const newEntry = JSON.parse(message.body);
            setChatEntry((prevEntries) => [newEntry, ...prevEntries]);
          }
        );
      },
      onStompError: (frame) => {
        console.error("Broker reported error: " + frame.headers["message"]);
        console.error("Additional details: " + frame.body);
      },
    });

    stompClient.current.activate();

    return () => {
      stompClient.current!.deactivate();
    };
  }, [group.id, token]);

  const sendMessage = () => {
    if (stompClient.current && stompClient.current.connected) {
      const messageBody = JSON.stringify({
        token: token,
        message: message,
      });

      stompClient.current.publish({
        destination: `/app/groups/${group.id}/chat`,
        body: messageBody,
      });

      setMessage("");
    } else {
      console.log("Not connected to WebSocket.");
    }
  };

  return (
    <BaseContainer>
      <div className="flex flex-col gap-4 items-start w-full p-4">
        {oldChats?.map((oldChat) =>
          userId == oldChat.userId ? (
            <ChatBubble
              text={oldChat.message}
              isSelf={true}
              key={oldChat.date}
            />
          ) : (
            <ChatBubble
              text={oldChat.message}
              isSelf={false}
              initials={oldChat.userInitials}
            />
          )
        )}
        {chatEntry
          ?.sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((oldChat) =>
            userId == oldChat.userId ? (
              <ChatBubble
                text={oldChat.message}
                isSelf={true}
                key={oldChat.date}
              />
            ) : (
              <ChatBubble
                text={oldChat.message}
                isSelf={false}
                initials={oldChat.userInitials}
                key={oldChat.date}
              />
            )
          )}

        {/* <ChatBubble text="hello" isSelf={true} />
        <ChatBubble text="hello" isSelf={false} initials="RO" /> */}
      </div>
      <div className="flex justify-end p-5">
        <div className="flex left-0 fixed pb-24 pt-4 w-full px-4 gap-4 bg-black bottom-0">
          <input
            className="flex rounded-lg bg-input placeholder-gray-600 p-3 w-full"
            placeholder="Type in your message"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </div>
    </BaseContainer>
  );
};

export default ChatTab;
