export interface User {
  user_id: string;
  full_name: string;
  email: string;
  department_name: string;
  abbreviation: string;
}

export interface UserDto {
  user_id: string;
  full_name: string;
  email: string;
  department_name: string;
  abbreviation: string;
}


export type Users = User[];
