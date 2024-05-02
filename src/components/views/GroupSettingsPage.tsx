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
  const [habitIds, setHabitIds] = useState<string[]>([]);
  const [userNames, setUserNames] = useState<{ [key: string]: string }>({});
  const [groupName, setGroupName] = useState<string>("");

  useEffect(() => {
    const fetchGroupIds = async () => {
      try {
        const response = await api.get(`/groups/${groupId}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        const { name, adminIdList, habitIdList } = response.data;
        setAdminIds(adminIdList);
        setHabitIds(habitIdList);
        setGroupName(name);
      } catch (error) {
        console.error("Error fetching group ids:", error);
      }
    };

    const fetchUserNames = async () => {
      try {
        const response = await api.get(`/groups/${groupId}/users`, {
          headers: { Authorization: localStorage.getItem("token") },
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

  return (
    <div className="overflow-y-auto pb-24">
      <BaseContainer>
        <NavigationBar title="Group settings" backUrl={`/app/${groupId}`} />
        <div className="flex flex-col items-center justify-start">
          <div className="w-custom-354">
            <h1 className="text-accent text-2xl mt-4">{groupName}</h1>
            <h3 className="text-left mt-2">Actions</h3>
            <Link
              to={`/app/${groupId}/create-habit`}
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
                  <img className="h-6 w-6" src="/group.png" alt="group icon" />
                </div>
                <div
                  className="ml-4 text-base cursor-pointer"
                  onClick={() => navigate(`/invite/${groupId}`)}
                >
                  Invite People
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between hover:underline w-full h-10 bg-input rounded-lg mb-0.5">
              <div className="flex items-center">
                <div className="pl-4">
                  <img className="h-6 w-6" src="/update.png" alt="update icon" />
                </div>
                <div
                  className="ml-4 text-base cursor-pointer"
                  onClick={() => navigate(`/app/${groupId}/update-group`)}
                >
                  Update Group
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between hover:underline w-full h-10 bg-input rounded-lg mb-0.5">
              <div className="flex items-center">
                <div className="pl-4">
                  <img className="h-6 w-6" src="/delete.png" alt="group icon" />
                </div>
                <div
                  className="ml-4 text-base cursor-pointer"
                  onClick={() => navigate(`/app/${groupId}/delete-group`)}
                >
                  Delete Group
                </div>
              </div>
            </div>
            {/*------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">Group Members</h3>
            {Object.entries(userNames)?.map(([userId, userName]) => (
              <SettingsUserBox
                key={userId}
                groupId={groupId ?? "defaultGroupId"}
                userId={userId}
                userName={userName}
                isAdmin={adminIds.includes(userId)}
              />
            ))}
            {/*--------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">Group Habits</h3>
            {habitIds?.map((habitIds) => (
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
