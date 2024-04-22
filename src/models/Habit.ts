export interface Habit {
  id: string;
  name: string;
  streaks: number;
  onSchedule: boolean;
  checked: boolean;
  userCheckStatus: Record<string, boolean>;
}

export enum HabitRepeatStrategy {
  Daily = "DAILY",
  Weekly = "WEEKLY",
}
