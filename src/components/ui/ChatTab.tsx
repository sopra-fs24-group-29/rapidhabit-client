import { Client } from "@stomp/stompjs";
import { api } from "helpers/api";
import { Group } from "models/Group";
import { oldChat } from "models/oldChat";
import { useEffect, useState } from "react";
import BaseContainer from "./BaseContainer";
import { Button } from "./Button";
import ChatBubble from "./ChatBubble";

interface ChatTabProps {
  group: Group;
}

const ChatTab = (props: ChatTabProps) => {
  const [oldChats, setOldChats] = useState<oldChat[]>();
  const [message, setMessage] = useState<string>("");
  const [chatEntry, setchatEntry] = useState<oldChat[]>([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const groupId = props.group.id;

  useEffect(() => {
    const fetchOldChats = async () => {
      try {
        const response = await api.get(`/groups/${groupId}/chat`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        setOldChats(response.data || []);
      } catch (error) {
        console.error("Error fetching group ids:", error);
      }
    };
    fetchOldChats();
  }, [groupId]);

  useEffect(() => {
    const token = localStorage.getItem("token")!;
    const stompClient = new Client({
      brokerURL: "ws:/localhost:8080/ws",
      connectHeaders: {
        Authorization: token,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WS");

        stompClient.subscribe(`/topic/groups/${groupId}/chat`, (message) => {
          const newEntry = JSON.parse(message.body);
          setchatEntry((prevEntries) => [newEntry, ...prevEntries]);
        });
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
  }, [groupId]);

  const sendMessage = async () => {
    const requestBody = JSON.stringify({
      token,
      message,
    });
    try {
      await api.put(`/groups/${groupId}/chat`, requestBody, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.error("Error fetching group ids:", error);
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
        {chatEntry?.map((oldChat) =>
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
        <ChatBubble text="hello" isSelf={true} />
        <ChatBubble text="hello" isSelf={false} initials="RO" />
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
