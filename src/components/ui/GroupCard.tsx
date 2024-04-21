import { Link } from "react-router-dom";

interface GroupCardProps {
  habitName: string;
  streaks: number;
  groupId: string;
  habitId: string;
}

const GroupCard = (props: GroupCardProps) => {
  return (
    <Link to={`/app/${props.groupId}/habit/${props.habitId}`}>
      <div className="bg-dark-green p-4 rounded-lg">
        <div className="flex flex-row justify-between">
          <div>🔥{props.streaks}</div>
          <div>☑️</div>
        </div>
        <div className="pt-6 pb-2 text-xl font-bold truncate">
          {props.habitName}
        </div>
        <div className="flex justify-end gap-1.5">
          <div className="rounded-full bg-light-green w-7 h-7 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div>
          <div className="rounded-full bg-light-green w-7 h-7 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div>
          <div className="rounded-full bg-light-green w-7 h-7 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupCard;
