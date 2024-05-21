export interface Score {
  userId: string;
  userInitials: string;
  points: number;
}

export type Ranking = Score[];
