export interface ActivityEntry {
  date: string;
  status: ActivityStatus;
}

export type Activity = ActivityEntry[];

export enum ActivityStatus {
  Inactive = "INACTIVE",
  Success = "SUCCESS",
  Fail = "FAIL",
  Open = "OPEN",
}
