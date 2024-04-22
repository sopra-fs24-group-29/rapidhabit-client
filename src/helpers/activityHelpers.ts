import { Activity } from "models/Activity";
import { useMemo } from "react";

export type GroupedActivities = {
  [year: string]: Activity;
};

export const useGroupedActivities = (
  activities?: Activity
): GroupedActivities => {
  return useMemo(() => {
    const grouped: GroupedActivities = {};

    activities?.forEach((activity) => {
      const year = new Date(activity.date).getFullYear().toString();
      if (!grouped[year]) {
        grouped[year] = [];
      }
      grouped[year].push(activity);
    });

    return grouped;
  }, [activities]);
};

export default useGroupedActivities;
