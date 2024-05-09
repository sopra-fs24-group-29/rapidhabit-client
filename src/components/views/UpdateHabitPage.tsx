import BaseContainer from "components/ui/BaseContainer";
import { Button } from "components/ui/Button";
import FormField from "components/ui/FormField";
import NavigationBar from "components/ui/NavigationBar";
import { api } from "helpers/api";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HabitRepeatStrategy } from "../../models/Habit.ts";
import RadioOptions from "../ui/RadioOptions.tsx";
import Option from "../ui/Option.tsx";

const WEEKDAYS = {
  MONDAY: "Mon",
  TUESDAY: "Tue",
  WEDNESDAY: "Wed",
  THURSDAY: "Thu",
  FRIDAY: "Fri",
  SATURDAY: "Sat",
  SUNDAY: "Sun",
};

const UpdateHabitPage = () => {
  const { groupId } = useParams();
  const { habitId } = useParams();
  const navigate = useNavigate();

  const [habitName, setHabitName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [rewardPoints, setRewardPoints] = useState<number>(1);

  const [repeatType, setRepeatType] = useState<HabitRepeatStrategy>(
    HabitRepeatStrategy.Daily
  );
  const [repeatMap, setRepeatMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchHabitDetails = async () => {
      try {
        const response = await api.get(
          `/groups/${groupId}/habits/${habitId}/edit`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        console.log("Response:", response);
        const { name, description, rewardPoints } = response.data;
        setHabitName(name);
        setDescription(description);
        setRewardPoints(rewardPoints);
      } catch (error) {
        console.error("Error fetching habit details:", error);
      }
    };

    fetchHabitDetails();
  }, [habitId, groupId]);

  const updateHabit = async () => {
    try {
      await api.put(
        `/groups/${groupId}/habits/${habitId}/update`,
        {
          name: habitName,
          description: description,
          repeatStrategy: { type: repeatType, weekdayMap: repeatMap },
          rewardPoints: rewardPoints,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      console.log("Habit updated successfully!");
      navigate(`/app/${groupId}`);
    } catch (error) {
      console.error("Error updating habit:", error);
    }
  };

  return (
    <BaseContainer>
      <NavigationBar
        title="Update habit"
        backUrl={`/app/${groupId}/settings`}
        rightAction={
          <Button variant="text" onClick={updateHabit} className="hover:text-accent">
            Update
          </Button>
        }
      />
      <div className="px-8">
        <h3 className="mt-5">Name of habit</h3>
        <FormField value={habitName} onChange={setHabitName} maxLength={50} />

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

export default UpdateHabitPage;
