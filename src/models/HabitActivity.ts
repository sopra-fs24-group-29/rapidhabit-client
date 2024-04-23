import { ActivityStatus } from "./Activity";

export interface HabitActivity {
  name: string;
  currentTeamStreak: number;
  statusMap: HabitStatusMap;
}

export type HabitStatusMap = Record<string, Record<string, ActivityStatus>>;
