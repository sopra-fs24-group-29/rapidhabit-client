import AvaterHabitDetail from "components/ui/AvatarHabitDetail";
import BaseContainer from "components/ui/BaseContainer";
import Check from "components/ui/Check";
import NavigationBar from "components/ui/NavigationBar";
import TabBar from "components/ui/Tabbar";
import { useParams } from "react-router-dom";

const HabitDetail = () => {
  const { groupId } = useParams();
  return (
    <div>
      <BaseContainer>
        <NavigationBar backUrl={`/app/${groupId}`} />
        <div>
          <div className="font-bold text-4xl p-4">🏋🏽Workout</div>
          <div className="flex flex-row justify-between p-4">
            <div className="text-lg font-semibold">🔥 Current streak</div>
            <div className="text-lg font-semibold">3 days</div>
          </div>
          <div className="flex flex-row justify-end gap-7 pr-4">
            <AvaterHabitDetail initials="RO" />
            <AvaterHabitDetail initials="RO" />
            <AvaterHabitDetail initials="RO" />
            <AvaterHabitDetail initials="RO" />
          </div>
          <div className="flex flex-row justify-end p-6 gap-11 ">
            <div className="flex-grow">Today</div>
            <Check />
            <Check isChecked />
            <Check isChecked />
            <Check />
          </div>
          <div className="flex flex-row justify-end p-6 gap-11 bg-dark-green">
            <div className="flex-grow">Today</div>
            <Check isChecked />
            <Check isChecked />
            <Check isChecked />
            <Check isChecked />
          </div>
          <div className="flex flex-row justify-end p-6 gap-11 ">
            <div className="flex-grow">Today</div>
            <Check />
            <Check isChecked />
            <Check isChecked />
            <Check />
          </div>
        </div>
      </BaseContainer>
      <TabBar />
    </div>
  );
};

export default HabitDetail;
