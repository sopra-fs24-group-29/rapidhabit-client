import { AxiosError } from "axios";
import clsx from "clsx";
import ActivityTab from "components/ui/ActivityTab";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import ChatTab from "components/ui/ChatTab";
import HabitCard from "components/ui/HabitCard";
import NavigationBar from "components/ui/NavigationBar";
import RankingTab from "components/ui/RankingTab";
import TabBar from "components/ui/Tabbar";
import { api, handleError } from "helpers/api";
import { Group } from "models/Group";
import { Habit } from "models/Habit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const GroupDetail = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [activeTab, setActiveTab] = useState("activity");

  const [group, setGroup] = useState<Group>();
  const [habits, setHabits] = useState<Habit[]>();

  const [adminIds, setAdminIds] = useState<string[]>([]);
  const currentUserId = localStorage.getItem("userId") ?? "";
  const isAdmin = adminIds.includes(currentUserId);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [groupResponse, habitsResponse] = await Promise.all([
          api.get(`/groups/${groupId}`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
          api.get(`/groups/${groupId}/habits`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
        ]);
        const { adminIdList } = groupResponse.data;
        setAdminIds(adminIdList);
        setGroup(groupResponse.data || []);
        setHabits(habitsResponse.data || []);
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          // Session likely expired
          localStorage.removeItem("token");
          navigate("/");
        }
        console.error(`Error while fetching habits: \n${handleError(error)}`);
        setErrorMessage("Group details could not be loaded.");
      } finally {
        setIsLoading(false);
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

  const [showDescription, setShowDescription] = useState(false); // State to manage visibility of description box
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div>
      <BaseContainer className="pb-40">
        <NavigationBar
          backUrl="/app"
          rightAction={
            isAdmin && (
              <Button
                variant="text"
                className="hover:text-accent"
                onClick={() => navigate(`/app/${groupId}/settings`)}
              >
                Settings
              </Button>
            )
          }
        />
        <h1 className="text-4xl px-4 pt-6 font-bold truncate">{group?.name}</h1>

        <div>
          <span
            className="cursor-pointer ml-4 text-xs text-tab-off"
            onClick={toggleDescription}
          >
            {showDescription ? "Hide Description" : "Show Description"}
          </span>
          {showDescription && (
            <div className="ml-4 p-3 bg-input rounded text-sm">
              {group?.description || "No description available."}
            </div>
          )}
        </div>

        <div></div>

        {isLoading ? (
          <div>Loading…</div>
        ) : errorMessage ? (
          <div>{errorMessage}</div>
        ) : !habits?.length ? (
          <div className="flex flex-col items-center justify-center gap-4 py-8">
            <span className="flex text-center p-6">
              No habits in this group. Please create a habit before inviting
              people
            </span>
            {isAdmin && (
              <Button onClick={() => navigate(`/app/${groupId}/create-habit`)}>
                New habit
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 p-4 gap-4">
            {habits?.map((habit) => (
              <HabitCard
                key={habit.id}
                groupId={groupId!}
                habitId={habit.id}
                habit={habit}
                onHabitsUpdated={setHabits}
              />
            ))}
          </div>
        )}
        <div className="flex flex-row gap-7 justify-evenly pt-6 pr-3">
          <button
            className={clsx(
              "font-semibold p-2",
              activeTab == "activity" &&
                "bg-dark-green rounded-2xl text-light-green"
            )}
            onClick={() => setActiveTab("activity")}
          >
            Your Activity
          </button>
          <button
            className={clsx(
              "font-semibold p-2",
              activeTab == "ranking" &&
                "bg-dark-green rounded-2xl text-light-green"
            )}
            onClick={() => setActiveTab("ranking")}
          >
            Ranking
          </button>
          <button
            className={clsx(
              "font-semibold p-2",
              activeTab == "chat" &&
                "bg-dark-green rounded-2xl text-light-green"
            )}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
        </div>
        {renderContent()}
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default GroupDetail;
