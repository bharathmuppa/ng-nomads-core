export interface StateCountOverview {
  state_counts: StateCounts
}

export interface StateCount {
  state: string;
  state_label: string;
  count: number;
  status_counts: StatusCounts;
}

export interface StatusCount {
  status: string;
  status_label: string;
  count: number;
}

export type StatusCounts = StatusCount[];

export type StateCounts = StateCount[];
