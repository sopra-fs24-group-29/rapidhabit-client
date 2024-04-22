import clsx from "clsx";
import { Habit } from "models/Habit";
import { Link } from "react-router-dom";
import Check from "./Check";

interface GroupCardProps {
  groupId: string;
  habitId: string;
  habit: Habit;
}

const GroupCard = (props: GroupCardProps) => {
  return (
    <Link to={`/app/${props.groupId}/habit/${props.habitId}`}>
      <div className="bg-dark-green p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <div>🔥{props.habit.streaks}</div>
          <Check isChecked={props.habit.checked} />
        </div>
        <div className="pt-6 pb-2 text-xl font-bold truncate">
          {props.habit.name}
        </div>
        <div className="flex justify-end gap-1.5">
          {Object.keys(props.habit.userCheckStatus).map((initial) => (
            <div
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

export default GroupCard;
