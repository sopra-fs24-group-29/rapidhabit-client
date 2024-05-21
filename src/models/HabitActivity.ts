import { ActivityStatus } from "./Activity";

export interface HabitActivity {
  description: string;
  name: string;
  currentTeamStreak: number;
  statusMap: HabitStatusMap;
}

export type HabitStatusMap = Record<string, Record<string, ActivityStatus>>;
