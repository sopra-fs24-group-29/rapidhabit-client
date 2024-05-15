import { Link } from "react-router-dom";
import Avatar from "./Avatar";

interface GroupSectionProps {
  name: string;
  id: string;
  streak: number;
  currentRank: number;
  initials: string[];
}

const GroupSection = (props: GroupSectionProps) => {
  return (
    <Link to={`/app/${props.id}`}>
      <div className="flex flex-col bg-dark-green p-6 m-5 rounded-lg mb-1">
        <div className="flex flex-row justify-between">
          <div className="font-bold">{props.streak} 🔥</div>
          <div>
            <div>Current rank</div>
            <div className="font-bold">{props.currentRank} 👑</div>
          </div>
        </div>

        <div className="text-xl font-bold truncate">{props.name}</div>
        <div className="flex justify-end gap-1.5">
          {props.initials?.map((initial, index) => (
            <Avatar initials={initial} key={index} />
          ))}
        </div>
      </div>
    </Link>
  );
};

export default GroupSection;
