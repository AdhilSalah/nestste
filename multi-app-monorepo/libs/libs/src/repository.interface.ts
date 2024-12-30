export interface Repository<T> {
  create(data: T): Promise<any>;
  find(query: object): Promise<T[]>;
  findOne(query: object): Promise<T | null>;
  update(query: object, updateData: Partial<T>): Promise<any>;
  delete(query: object): Promise<any>;
}
