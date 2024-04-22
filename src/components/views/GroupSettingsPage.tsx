import BaseContainer from "components/ui/BaseContainer";
import NavigationBar from "components/ui/NavigationBar.tsx";
import TabBar from "components/ui/Tabbar.tsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../../helpers/api.ts";
import SettingsHabitBox from "../ui/SettingsHabitBox.tsx";
import SettingsUserBox from "../ui/SettingsUserBox.tsx";

const GroupSettingsPage = () => {
  const { groupId } = useParams();

  const navigate = useNavigate();
  const [adminIds, setAdminIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [habitIds, setHabitIds] = useState<string[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchGroupIds = async () => {
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
        console.error("Error fetching group ids:", error);
      }
    };

    const fetchUserNames = async () => {
      try {
        const response = await api.get(`/groups/${groupId}/users`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        const userNames = response.data;
        setUserNames(userNames);
      } catch (error) {
        console.error("Error fetching user names:", error);
      }
    };

    fetchGroupIds();
    fetchUserNames();
  }, [groupId]);

  console.log(userNames);
  console.log(adminIds);
  console.log(userIds);
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
                  <img className="h-6 w-6" src="/add.png" alt="add icon" />
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
                <div
                  className="ml-4 text-base cursor-pointer"
                  onClick={() => navigate(`/invite/${groupId}`)}
                >
                  Invite People
                </div>
              </div>
            </div>
            {/*------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">People</h3>
            <div className="flex items-center justify-between w-full h-10 bg-input rounded-lg mb-0.5">
              <div className="flex items-center">
                <div className="pl-4">
                  <img className="h-7 w-7" src="/user.png" alt="user icon" />
                </div>
                <div className="ml-4 text-base">ali</div>
              </div>
              <div className="pr-4 text-xs text-admin">
                <h3>admin</h3>
              </div>
            </div>
            {Object.entries(userNames)
              .filter(([userId]) => !adminIds.includes(userId))
              .map(([userId, userName]) => (
                <SettingsUserBox
                  key={userId}
                  groupId={groupId ?? "defaultGroupId"}
                  userId={userId}
                  userName={userName}
                />
              ))}
            {/*--------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">Habits</h3>
            {habitIds.map((habitIds) => (
              <SettingsHabitBox
                key={habitIds}
                groupId={groupId ?? "defaultGroupId"}
                habitId={habitIds}
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
