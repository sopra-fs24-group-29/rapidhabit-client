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
  console.log(props.streak);
  return (
    <Link to={`/app/${props.id}`}>
      <div className="flex flex-col bg-dark-green p-6 m-5 rounded-lg mb-1">
        <div className="flex flex-row justify-between">
          <div className="font-bold">{props.streak}🔥</div>
          <div>
            <div>Current rank</div>
            <div className="font-bold">{props.currentRank}👑</div>
          </div>
        </div>

        <div className="text-xl font-bold">{props.name}</div>
        <div className="flex justify-end gap-1.5">
          {props.initials?.map((initial) => (
            <Avatar initials={initial} />
          ))}
          {/* <div className="rounded-full bg-light-green w-8 h-8 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div>
          <div className="rounded-full bg-light-green w-8 h-8 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div> */}
        </div>
      </div>
    </Link>
  );
};

export default GroupSection;
