import BaseContainer from "components/ui/BaseContainer";
import TabBar from "components/ui/Tabbar.tsx";
import { useEffect, useState } from "react";
import { api } from "../../helpers/api.ts";
import SettingsHabitBox from "../ui/SettingsHabitBox.tsx";
import { useNavigate, useParams } from "react-router-dom";
import SettingsUserBox from "../ui/SettingsUserBox.tsx";

const GroupSettingsPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [adminIds, setAdminIds] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [habitIds, setHabitIds] = useState([]);
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
  }, );

  console.log(userNames);
  console.log(adminIds);
  console.log(userIds);

  return (
    <div>
      <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">

          <div className="flex items-center justify-between w-full">
            <img
              className="cursor-pointer h-4"
              src="/left-arrow.png"
              alt="back-arrow"
              onClick={() => navigate(`/app/${groupId}`)}
            />
            <h3 className="text-center">Group Settings</h3>
            <h3></h3>
          </div>

          <div className="w-custom-354">
            <h3 className="text-left mt-4">Actions</h3>
            <div className="flex items-center justify-between w-full h-10 bg-input rounded-lg mb-0.5">
              <div className="flex items-center">
                <div className="pl-4">
                  <img
                    className="h-6 w-6"
                    src="/add.png"
                    alt="add icon"
                  />
                </div>
                <div className="ml-4 text-base hover:underline cursor-pointer">
                  Create Habit
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between w-full h-10 bg-input rounded-lg mb-0.5">
              <div className="flex items-center">
                <div className="pl-4">
                  <img
                    className="h-7 w-7"
                    src="/group.png"
                    alt="group icon"
                  />
                </div>
                <div className="ml-4 text-base hover:underline cursor-pointer">
                  Invite People
                </div>
              </div>
            </div>
            {/*------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">People</h3>
            {Object.entries(userNames).map(([userId, userName]) => (
              <SettingsUserBox key={userId} userId={userId} userName={userName} />
            ))}
            {/*--------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">Habits</h3>
            {habitIds.map(habitIds => (
              <SettingsHabitBox key={habitIds} groupId={groupId ?? 'defaultGroupId'} habitId={habitIds} />
            ))}

          </div>

        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default GroupSettingsPage;
