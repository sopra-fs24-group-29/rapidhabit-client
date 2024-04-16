export interface Group {
  id: string;
  name: string;
  streaks: number;
  currentRank: number;
  userIds: string[];
  userInitials: string[];
}
