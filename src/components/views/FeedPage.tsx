import { Client } from "@stomp/stompjs";
import { AxiosError } from "axios";
import BaseContainer from "components/ui/BaseContainer";
import { api } from "helpers/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FeedBox from "../ui/FeedBox.tsx";
import FeedBoxPulseCheck from "../ui/FeedBoxPulseCheck.tsx";
import TabBar from "../ui/Tabbar.tsx";

type FeedEntryType = "PULSECHECK";

interface FeedEntry {
  type: FeedEntryType;
  groupName: string;
  message: string;
  userSubmits: Record<string, number>;
}

const FeedPage = () => {
  const [feedEntries, setFeedEntries] = useState<FeedEntry[]>([]);
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const userIdResponse = await api.get(`/users/id`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUserId(userIdResponse.data || "");

        const groupResponse = await api.get(`/groups/groupIds`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setGroupIds(groupResponse.data || []);

        const feedResponse = await api.get(`/feed`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setFeedEntries(feedResponse.data || []);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else if (error instanceof Error) {
          console.error(`Failed to fetch data: ${error.message}`);
          alert("Failed to load data! Check console for details.");
        }
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!groupIds.length) return;

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
        groupIds.forEach((groupId) => {
          stompClient.subscribe(`/topic/groups/${groupId}/feed`, (message) => {
            const newEntry = JSON.parse(message.body);
            setFeedEntries((prevEntries) => [newEntry, ...prevEntries]);
          });
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
  }, [groupIds]);

  return (
    <div className="overflow-y-auto">
      <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">
          <div className="w-custom-236 lg:w-custom-354">
            <h1 className="text-left text-2xl lg:text-4xl">Feed</h1>
            <h2 className="mt-4">Today</h2>
            {feedEntries.map((entry, index) => {
              const userSubmitted =
                entry.userSubmits && userId in entry.userSubmits;
              const sliderValue = userSubmitted
                ? entry.userSubmits[userId]
                : 0.5;

              return entry.type === "PULSECHECK" ? (
                <FeedBoxPulseCheck
                  key={index}
                  group={entry.groupName + ":"}
                  color="bg-blue-500"
                  p1={entry.message}
                  isDisabled={userSubmitted}
                  initialSliderValue={sliderValue}
                />
              ) : (
                <FeedBox
                  key={index}
                  group={entry.groupName + ":"}
                  color="bg-blue-500"
                  p1={entry.message}
                />
              );
            })}
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default FeedPage;
