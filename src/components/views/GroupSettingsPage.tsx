import BaseContainer from "components/ui/BaseContainer";
import TabBar from "components/ui/Tabbar.tsx";
import SettingsUserBox from "../ui/SettingsUserBox.tsx";
import SettingsHabitBox from "../ui/SettingsHabitBox.tsx";

const GroupSettingsPage = () => {

  return (
    <div>
      <BaseContainer>
        <div className="flex flex-col items-center justify-start mt-8">

          <div className="flex items-center justify-between w-full">
            <img
              className="cursor-pointer h-4"
              src="/left-arrow.png"
              alt="back-arrow"
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
                    className="h-7 w-7"
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
            <SettingsUserBox firstname={"User"} lastname={"1"}></SettingsUserBox>
            <SettingsUserBox firstname={"User"} lastname={"2"}></SettingsUserBox>
            <SettingsUserBox firstname={"User"} lastname={"3"}></SettingsUserBox>
            {/*--------------------------------------------------------------------------------------- */}
            <h3 className="text-left mt-4">Habits</h3>
            <SettingsHabitBox habit={"Medidate"}></SettingsHabitBox>
            <SettingsHabitBox habit={"Running"}></SettingsHabitBox>
            <SettingsHabitBox habit={"Push Ups"}></SettingsHabitBox>
          </div>

        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default GroupSettingsPage;
