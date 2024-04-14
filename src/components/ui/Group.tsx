import { Link } from "react-router-dom";

interface GroupSectionProps {
  name: string;
  id: string;
}

const GroupSection = (props: GroupSectionProps) => {
  return (
    <Link to={`/app/${props.id}`}>
      <div className="flex flex-col bg-dark-green p-6 m-5 rounded-lg mb-1">
        <div className="flex flex-row justify-between">
          <div className="font-bold">24🔥</div>
          <div>
            <div>Current rank</div>
            <div className="font-bold">1st👑</div>
          </div>
        </div>

        <div className="text-xl font-bold">{props.name}</div>
        <div className="flex justify-end gap-1.5">
          <div className="rounded-full bg-light-green w-8 h-8 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div>
          <div className="rounded-full bg-light-green w-8 h-8 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div>
          <div className="rounded-full bg-light-green w-8 h-8 ">
            <span className="flex justify-center pt-2 text-dark-green font-semibold text-xs">
              RO
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GroupSection;
