import { Roles } from "./roles.entity";

export interface User {
  id?: string; // For SQL-based primary keys
  name: string;
  email: string;
  age?: number;
  roles:Roles[]
  createdAt?: Date;
  updatedAt?: Date;
}
