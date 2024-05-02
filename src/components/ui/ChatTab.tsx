import { useEffect, useState } from "react";
import { api } from "../../helpers/api.ts";
import { useParams } from "react-router-dom";

const ChatTab = () => {
  const { groupId } = useParams();
  const [chatMessages, setChatMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const fetchChatMessages = async () => {
      try {
        const response = await api.get(`/groups/${groupId}`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        console.log(response);
        setChatMessages(response.data);
      } catch (error) {
        console.error("Error fetching group information:", error);
      }
    };

    fetchChatMessages();
  }, [groupId]);

  return (
    <div>
      <div className="p-4 mt-6">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="bg-input rounded-lg px-2 py-1 w-96"
        />
        <button
          className="bg-accent text-black px-2 py-1 rounded-lg ml-4"
        >
          Send
        </button>
      </div>
    </div>
  )
}
export default ChatTab;