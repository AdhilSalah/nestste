export interface User {
  id?: string; // For SQL-based primary keys
  name: string;
  email: string;
  age?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
