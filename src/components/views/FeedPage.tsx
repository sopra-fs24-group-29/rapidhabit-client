import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { Client } from "@stomp/stompjs";

import FeedBox from "../ui/FeedBox";
import FeedBoxPulseCheck from "../ui/FeedBoxPulseCheck";
import BaseContainer from "../ui/BaseContainer";
import TabBar from "../ui/Tabbar";
import { api } from "helpers/api";

interface FeedEntry {
  userSubmits?: Record<string, number>;
  type: string;
  groupName: string;
  message: string;
}

const FeedPage = () => {
  const [feedEntries, setFeedEntries] = useState<FeedEntry[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [userId, setUserId] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token") ?? "";
        if (!token) {
          navigate("/");
          return;
        }

        const userIdResponse = await api.get("/users/id", {
          headers: { Authorization: token },
        });
        setUserId(userIdResponse.data || "");

        const groupResponse = await api.get("/groups/groupIds", {
          headers: { Authorization: token },
        });
        setGroups(groupResponse.data || []);

        const feedResponse = await api.get("/feed", {
          headers: { Authorization: token },
        });
        setFeedEntries(feedResponse.data || []);
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.error(
            `Failed to fetch data: ${(error as AxiosError).message}`
          );
          alert("Failed to load data! Check console for details.");
        }
      }
    }

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (groups.length === 0) return;

    const token = localStorage.getItem("token") ?? "";
    const stompClient = new Client({
      brokerURL: "ws://sopra-fs24-group29-server.oa.r.appspot.com/ws",
      connectHeaders: {
        Authorization: token,
      },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected to WS");
        groups.forEach((groupId) => {
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
  }, [groups]);

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
                  group={entry.groupName}
                  color="bg-blue-500"
                  p1={entry.message}
                  p2="Halte durch, bald hast du es geschafft!"
                  isDisabled={userSubmitted}
                  initialSliderValue={sliderValue}
                />
              ) : (
                <FeedBox
                  key={index}
                  group={entry.groupName}
                  color="bg-blue-500"
                  p1={entry.message}
                  p2="Halte durch, bald hast du es geschafft!"
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
