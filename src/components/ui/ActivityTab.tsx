import clsx from "clsx";
import { Group } from "models/Group";

interface ActivityTabProps {
  group: Group;
}

const ActivityTab = (props: ActivityTabProps) => (
  <div>
    <div className="pt-6 pl-6 font-semibold">2023</div>
    <div className="flex flex-wrap gap-1 pt-3 px-8">
      {new Array(72)
        .fill(0)
        .map(() => Math.random() > 0.5)
        .map((isChecked) => (
          <div
            className={clsx(
              "w-2 h-2 m-[1px] rounded-sm",
              isChecked ? "bg-light-green" : "bg-dark-green"
            )}
          />
        ))}
    </div>
  </div>
);

export default ActivityTab;
