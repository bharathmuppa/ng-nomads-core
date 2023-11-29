export interface UserProfile {
  full_name: string;
  email: string;
  employee_number: string;
  abbreviation: string;
  department_name: string;
  roles?: string[];
  groups?: string[];
  user_id: string;
  last_accessed_on: Date;
  memberships: string[];
}


export interface Membership {
  category: string;
  groups: Group[];
}

export class Group {
  name?: string;
  group_id?: string;
}
