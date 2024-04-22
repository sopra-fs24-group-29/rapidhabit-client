import BaseContainer from "components/ui/BaseContainer";
import TabBar from "components/ui/Tabbar.tsx";
import { useEffect, useState } from "react";
import { api } from "../../helpers/api.ts";
import SettingsUserBox from "../ui/SettingsUserBox.tsx";
import SettingsHabitBox from "../ui/SettingsHabitBox.tsx";
import { useNavigate, useParams } from "react-router-dom";

const GroupSettingsPage = () => {
  const { groupId } = useParams();
  const navigate = useNavigate();
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

  console.log('Admin IDs:', adminIds);
  console.log('User IDs:', userIds);
  console.log('Habit IDs:', habitIds);

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
            {userIds.map(userIds => (
              <SettingsUserBox key={userIds} userId={userIds} />
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
