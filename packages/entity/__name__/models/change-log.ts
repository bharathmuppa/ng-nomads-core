export interface ChangeLog {
  user_id: string;
  old_value: any;
  new_value: any;
  property: string;
  modified_on: Date;
  modification_type: string;
}

export type ChangeLogs = ChangeLog[]
