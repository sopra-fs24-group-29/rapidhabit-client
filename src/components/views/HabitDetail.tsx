import clsx from "clsx";
import AvaterHabitDetail from "components/ui/AvatarHabitDetail";
import BaseContainer from "components/ui/BaseContainer";
import Check from "components/ui/Check";
import NavigationBar from "components/ui/NavigationBar";
import TabBar from "components/ui/Tabbar";
import { api, handleError } from "helpers/api";
import { ActivityStatus } from "models/Activity";
import { Group } from "models/Group";
import { HabitActivity } from "models/HabitActivity";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const formattedDate = (apiDate: string): string => {
  const inputDate = new Date(apiDate);
  const today = new Date();

  if (
    inputDate.getDate() === today.getDate() &&
    inputDate.getMonth() === today.getMonth() &&
    inputDate.getFullYear() === today.getFullYear()
  ) {
    return "Today";
  }

  return inputDate.toLocaleDateString("en-US", {
    dateStyle: "medium",
  });
};

const HabitDetail = () => {
  const { groupId, habitId } = useParams();

  const [habitActivity, setHabitActivity] = useState<HabitActivity>();
  const [group, setGroup] = useState<Group>();

  const [showDescription, setShowDescription] = useState(false);
  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const [groupResponse, habitActivityResponse] = await Promise.all([
          api.get(`/groups/${groupId}`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
          api.get(`/groups/${groupId}/habits/${habitId}`, {
            headers: { Authorization: localStorage.getItem("token") },
          }),
        ]);
        setGroup(groupResponse.data || []);
        setHabitActivity(habitActivityResponse.data || []);
      } catch (error) {
        console.error(
          `Something went wrong while fetching the habit activity: \n${handleError(
            error
          )}`
        );
        alert(
          "Something went wrong while loading the habit activity! See the console for details."
        );
      }
    }
    fetchData();
  }, [groupId, habitId]);

  if (!group || !habitActivity) return null;


  return (
    <div>
      <BaseContainer>
        <NavigationBar backUrl={`/app/${groupId}`} />
        <div>
          <div className="font-bold text-4xl px-4 pt-4">{habitActivity.name}</div>
          <div>
          <span className="cursor-pointer ml-4 text-xs text-tab-off" onClick={toggleDescription}>
            {showDescription ? "Hide Description" : "Show Description"}
          </span>
            {showDescription && (
              <div
                className="ml-4 p-3 bg-input rounded text-sm">{"No description available."}</div>
            )}
          </div>
          <div className="flex flex-row justify-between p-4">
            <div className="text-lg font-semibold">🔥 Current streak</div>
            <div className="text-lg font-semibold">
              {habitActivity.currentTeamStreak} days
            </div>
          </div>
          <div className="flex flex-row justify-end gap-7 pr-4 mb-4">
            {group.userInitials?.map((user) => (
              <AvaterHabitDetail initials={user} key={user} />
            ))}
          </div>
          {Object.entries(habitActivity.statusMap).map(
            ([date, peopleActivity]) => {
              const completedByAllUsers = !Object.values(peopleActivity).some(
                (status) => status !== ActivityStatus.Success
              );
              return (
                <div
                  key={date}
                  className={clsx("flex flex-row justify-end p-6 gap-11", {
                    "bg-dark-green": completedByAllUsers,
                  })}
                >
                  <div className="flex-grow">{formattedDate(date)}</div>
                  {Object.entries(peopleActivity).map(
                    ([userInitials, status]) => (
                      <Check
                        key={userInitials}
                        isChecked={status === ActivityStatus.Success}
                      />
                    )
                  )}
                </div>
              );
            }
          )}
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default HabitDetail;
