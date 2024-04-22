import clsx from "clsx";
import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import GroupCard from "components/ui/GroupCard";
import NavigationBar from "components/ui/NavigationBar";
import TabBar from "components/ui/Tabbar";
import { api, handleError } from "helpers/api";
import { Group } from "models/Group";
import { Habit } from "models/Habit";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
    switch (activeTab) {
      case "activity":
        return (
          <div>
            <div className="pt-6 pl-6 font-semibold">2023</div>
            <div className="flex flex-wrap gap-1 pt-3 px-8">
              {new Array(72)
                .fill(0)
                .map(() => Math.random() > 0.5)
                .map((isChecked) => (
                  <div
                    className={clsx(
                      "w-2 h-2 m-[1px] rounded-sm",
                      isChecked ? "bg-light-green" : "bg-dark-green"
                    )}
                  />
                ))}
            </div>
          </div>
        );
      case "ranking":
        return (
          <>
            <div className="flex justify-center gap-7 pt-14">
              <div className="rounded-full bg-light-green w-16 h-16 ">
                <span className="flex justify-center pt-4 text-dark-green font-semibold text-2xl">
                  RO
                </span>
              </div>
              <div className="rounded-full bg-yellow-400 w-7 h-7 mt-10 border-2 border-black -ml-11">
                <span className="text-black font-bold pl-2">1</span>
              </div>
              <div className="rounded-full bg-light-green w-16 h-16 ">
                <span className="flex justify-center pt-4 text-dark-green font-semibold text-2xl">
                  RO
                </span>
              </div>
              <div className="rounded-full bg-yellow-400 w-7 h-7 mt-10 border-2 border-black -ml-11">
                <span className="text-black font-bold pl-2">1</span>
              </div>
              <div className="rounded-full bg-light-green w-16 h-16 ">
                <span className="flex justify-center pt-4 text-dark-green font-semibold text-2xl">
                  RO
                </span>
              </div>
              <div className="rounded-full bg-yellow-400 w-7 h-7 mt-10 border-2 border-black -ml-11">
                <span className="text-black font-bold pl-2">1</span>
              </div>
            </div>
            <div className="font-semibold p-7">
              You're currently in second place. Greatjob, keep it up!
            </div>
          </>
        );
      case "chat":
        return <div>Chat content goes here...</div>;
      default:
        return <div>Activity content goes here...</div>;
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
