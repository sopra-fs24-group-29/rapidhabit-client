import clsx from "clsx";
import useGroupedActivities from "helpers/activityHelpers";
import { api } from "helpers/api";
import { Activity, ActivityStatus } from "models/Activity";
import { Group } from "models/Group";
import { useEffect, useState } from "react";

interface ActivityTabProps {
  group: Group;
}

const ActivityTab = (props: ActivityTabProps) => {
  const groupId = props.group.id;

  const [activity, setActivity] = useState<Activity>();
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const response = await api.get(`/groups/${groupId}/activity`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setActivity(response.data);
      } catch (error) {
        setErrorMessage("The Activity of this group is currently unavailable.");
        console.error("Error while loading activty of group", error);
      }
    };
    loadActivity();
  }, [groupId]);

  const activitiesGroupedByYear = useGroupedActivities(activity);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!activity) return null;

  return (
    <div>
      {Object.keys(activitiesGroupedByYear).map((year) => (
        <div>
          <div className="pt-6 pl-6 font-semibold">{year}</div>
          <div className="flex flex-wrap gap-1 pt-3 px-8">
            {activitiesGroupedByYear[year].map((entry) => {
              const isChecked = entry.status === ActivityStatus.Success;
              return (
                <div
                  key={entry.date}
                  className={clsx(
                    "w-2 h-2 m-[1px] rounded-sm",
                    isChecked ? "bg-light-green" : "bg-dark-green"
                  )}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityTab;
