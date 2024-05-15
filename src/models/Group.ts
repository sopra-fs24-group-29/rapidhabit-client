export interface Group {
  id: string;
  name: string;
  description: string;
  streaks: number;
  currentRank: number;
  userIds: string[];
  userInitials: string[];
}
