import clsx from "clsx";
import ActivityTab from "components/ui/ActivityTab";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import ChatTab from "components/ui/ChatTab";
import GroupCard from "components/ui/GroupCard";
import NavigationBar from "components/ui/NavigationBar";
import RankingTab from "components/ui/RankingTab";
import TabBar from "components/ui/Tabbar";
import { api, handleError } from "helpers/api";
import { Group } from "models/Group";
import { Habit } from "models/Habit";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [group, setGroup] = useState<Group>();
  const [habits, setHabits] = useState<Habit[]>();
  const [activeTab, setActiveTab] = useState("activity");

  useEffect(() => {
    async function fetchData() {
      try {
        const [groupResponse, habitsResponse] = await Promise.all([
          api.get(`/groups/${groupId}`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
          api.get(`/groups/${groupId}/habits`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
        ]);
        setGroup(groupResponse.data || []);
        setHabits(habitsResponse.data || []);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the profile: \n${handleError(
            error
          )}`
        );
        alert(
          "Something went wrong while loading the profile! See the console for details."
        );
      }
    }
    fetchData();
  }, []);

  const renderContent = () => {
    if (!group) return null;
    switch (activeTab) {
      case "activity":
        return <ActivityTab group={group} />;
      case "ranking":
        return <RankingTab group={group} />;
      case "chat":
        return <ChatTab group={group} />;
      default:
        return <ActivityTab group={group} />;
    }
  };

  return (
    <div>
      <BaseContainer>
        <NavigationBar
          rightAction={
            <Button
              variant="text"
              onClick={() => navigate(`/app/${groupId}/settings`)}
            >
              Settings
            </Button>
          }
        />
        <h1 className="text-center text-4xl flex items-start pd p-6 font-bold pb-10">
          {group?.name}
        </h1>
        <div className="grid grid-cols-2 p-4 gap-4">
          {habits?.map((habit) => (
            <GroupCard
              key={habit.id}
              groupId={groupId!}
              habitId={habit.id}
              habit={habit}
            />
          ))}
        </div>
        <div className="flex flex-row gap-7 justify-evenly pt-6 pr-3">
          <div
            className={clsx(
              "font-semibold p-2",
              activeTab == "activity" &&
                "bg-dark-green rounded-2xl text-light-green"
            )}
            onClick={() => setActiveTab("activity")}
          >
            Your Activity
          </div>
          <div
            className={clsx(
              "font-semibold p-2",
              activeTab == "ranking" &&
                "bg-dark-green rounded-2xl text-light-green"
            )}
            onClick={() => setActiveTab("ranking")}
          >
            Ranking
          </div>
          <div
            className={clsx(
              "font-semibold p-2",
              activeTab == "chat" &&
                "bg-dark-green rounded-2xl text-light-green"
            )}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </div>
        </div>
        {renderContent()}
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default GroupDetail;
