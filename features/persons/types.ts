export enum Gender {
  Female = 1,
  Male = 2,
}

export interface Person {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
