import clsx from "clsx";
import { api } from "helpers/api";
import { Habit } from "models/Habit";
import { useState } from "react";
import { Link } from "react-router-dom";
import Check from "./Check";

interface HabitCardProps {
  groupId: string;
  habitId: string;
  habit: Habit;
  onHabitsUpdated: (habits: Habit[]) => void;
}

const HabitCard = (props: HabitCardProps) => {
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const toggleHabitChecked = async () => {
    setIsUpdating(true);
    try {
      const updatedHabit = await api.put(
        `/groups/${props.groupId}/habits/${props.habitId}/check`,
        {},
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      props.onHabitsUpdated(updatedHabit.data);
    } catch (error) {
      alert("Could not mark this habit as completed.");
      console.error("Error while updating habit", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Link to={`/app/${props.groupId}/habit/${props.habitId}`}>
      <div className="bg-dark-green p-4 rounded-lg relative">
        <div className="flex flex-row justify-between">
          <div>🔥{props.habit.streaks}</div>
          {props.habit.onSchedule ? (
            <button
              className={clsx(
                "p-4 absolute right-0 top-0",
                isUpdating && "opacity-20 cursor-progress"
              )}
              onClick={(event) => {
                event.preventDefault();
                toggleHabitChecked();
              }}
            >
              <Check isChecked={props.habit.checked} />
            </button>
          ) : (
            <span className="text-sm opacity-60">Not due today</span>
          )}
        </div>
        <div className="pt-6 pb-2 text-xl font-bold truncate">
          {props.habit.name}
        </div>
        <div className="flex justify-end gap-1.5">
          {Object.keys(props.habit.userCheckStatus).map((initial) => (
            <div
              key={initial}
              className={clsx(
                "rounded-full bg-light-green w-7 h-7",
                !props.habit.userCheckStatus[initial] && "opacity-20"
              )}
            >
              <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
                {initial}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default HabitCard;
