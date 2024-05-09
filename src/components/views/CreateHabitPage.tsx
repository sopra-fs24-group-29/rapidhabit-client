import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import FormField from "components/ui/FormField";
import NavigationBar from "components/ui/NavigationBar";
import Option from "components/ui/Option";
import RadioOptions from "components/ui/RadioOptions";
import { api, handleError } from "helpers/api";
import { HabitRepeatStrategy } from "models/Habit";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WEEKDAYS = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

const CreateHabitPage = () => {
  const navigate = useNavigate();
  const { groupId } = useParams();

  const [habitName, setHabitName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rewardPoints, setRewardPoints] = useState<number>(1);

  const [repeatType, setRepeatType] = useState<HabitRepeatStrategy>(
    HabitRepeatStrategy.Daily
  );
  const [repeatMap, setRepeatMap] = useState<Record<string, boolean>>({});

  const createHabit = async () => {
    try {
      const requestBody = JSON.stringify({
        name: habitName,
        description: description,
        repeatStrategy: { type: repeatType, weekdayMap: repeatMap },
        rewardPoints: rewardPoints,
      });
      await api.post(`/groups/${groupId}/habits`, requestBody, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      navigate(`/app/${groupId}`);
    } catch (error) {
      console.log("Something went wrong during the habit creation: ", error);
      alert(
        `Something went wrong during the habit creation: \n${handleError(
          error
        )}`
      );
    }
  };

  return (
    <BaseContainer>
      <NavigationBar
        title="New habit"
        backUrl={`/app/${groupId}`}
        rightAction={
          <Button variant="text" onClick={createHabit}>
            Create
          </Button>
        }
      />
      <div className="px-8">
        <h3 className="mt-5">Name of habit</h3>
        <FormField value={habitName} onChange={setHabitName} maxLength={50}/>

        <h3 className="mt-3">Description</h3>
        <FormField value={description} onChange={setDescription} maxLength={300}/>

        <h3 className="mt-3">Repeat type</h3>
        <RadioOptions
          options={{
            [HabitRepeatStrategy.Daily]: "Daily",
            [HabitRepeatStrategy.Weekly]: "Weekly",
          }}
          value={repeatType}
          onSelect={setRepeatType}
        />

        {repeatType === HabitRepeatStrategy.Weekly && (
          <div>
            <h3 className="mt-3">Repeat every</h3>
            <div className="flex gap-1 text-sm">
              {Object.entries(WEEKDAYS).map(([key, label]) => (
                <Option
                  key={key}
                  isSelected={repeatMap[key]}
                  onSelect={() =>
                    setRepeatMap({ ...repeatMap, [key]: !repeatMap[key] })
                  }
                >
                  {label}
                </Option>
              ))}
            </div>
          </div>
        )}
        <h3 className="mt-3">Reward Points</h3>
        <form>
          <input className="bg-input rounded-lg text-white px-2"
                 type="number"
                 value={rewardPoints}
                 onChange={(event) => setRewardPoints(parseInt(event.target.value))} min="1" max="10"
          />
        </form>

      </div>
    </BaseContainer>
  );
};

export default CreateHabitPage;
