import BaseContainer from "components/ui/BaseContainer";
import NavigationBar from "components/ui/NavigationBar.tsx";
import TabBar from "components/ui/Tabbar.tsx";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../helpers/api.ts";
import SettingsHabitBox from "../ui/SettingsHabitBox.tsx";
import SettingsUserBox from "../ui/SettingsUserBox.tsx";

const GroupSettingsPage = () => {
  const { groupId } = useParams();
  const [adminIds, setAdminIds] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [habitIds, setHabitIds] = useState([]);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await api.get(`/groups/${groupId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const { adminIdList, userIdList, habitIdList } = response.data;
        setAdminIds(adminIdList);
        setUserIds(userIdList);
        setHabitIds(habitIdList);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchGroupDetails();
  }, []);

  console.log("Admin IDs:", adminIds);
  console.log("User IDs:", userIds);
  console.log("Habit IDs:", habitIds);

  return (
    <div>
      <BaseContainer>
        <NavigationBar title="Group settings" backUrl={`/app/${groupId}`} />
        <div className="flex flex-col items-center justify-start">
          <div className="w-custom-354">
            <h3 className="text-left mt-4">Actions</h3>
            <Link
              to={`/app/${groupId}/settings/create-habit`}
              className="flex items-center justify-between hover:underline w-full h-10 bg-input rounded-lg mb-0.5"
            >
              <div className="flex items-center">
                <div className="pl-4">
                  <img className="h-7 w-7" src="/add.png" alt="add icon" />
                </div>
                <div className="ml-4 text-base cursor-pointer">
                  Create Habit
                </div>
              </div>
            </Link>
            <div className="flex items-center justify-between hover:underline w-full h-10 bg-input rounded-lg mb-0.5">
              <div className="flex items-center">
                <div className="pl-4">
                  <img className="h-7 w-7" src="/group.png" alt="group icon" />
                </div>
                <div className="ml-4 text-base cursor-pointer">
                  Invite People
                </div>
              </div>
            </div>
            {/*------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">People</h3>
            {userIds.map((userId) => (
              <SettingsUserBox key={userId} userId={userId} />
            ))}
            {/*--------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">Habits</h3>
            {habitIds.map((habitId) => (
              <SettingsHabitBox
                key={habitId}
                groupId={groupId}
                habitId={habitId}
              />
            ))}
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default GroupSettingsPage;
