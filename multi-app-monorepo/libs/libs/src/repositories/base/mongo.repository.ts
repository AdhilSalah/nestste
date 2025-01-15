import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { MongoClient, Db, Collection, OptionalUnlessRequiredId, WithId } from 'mongodb';
import { BaseRepository } from '../../repository.interface';
@Injectable()
export class MongoDBRepository<T> implements BaseRepository<T>,OnModuleInit,OnModuleDestroy  {
  private client: MongoClient;
  private db: Db;
  private readonly collectionName: string;
  constructor(collectionName) {
    // this.client = new MongoClient('mongodb://localhost:27017');
    // this.db = this.client.db('Axisbank');
    this.collectionName = collectionName
  }

  async onModuleInit() {
    if (!this.client) {
      this.client = new MongoClient(process.env.url);
      await this.client.connect();
      this.db = this.client.db(process.env.db_name);
      console.log('Connected to MongoDB');
    }
  }
  // Close the database connection when the module is destroyed
  async onModuleDestroy() {
    if (this.client) {
      try {
        await this.client.close();
        console.log('MongoDB connection closed');
      } catch (error) {
        console.error('Error closing MongoDB connection:', error);
      }
    } else {
      console.log('MongoDB connection was not initialized');
    }
  }
  private getCollection(): Collection<T> {
    if (!this.db) {
      throw new Error('MongoDB connection not established');
    }
    return this.db.collection<T>(this.collectionName);
  }

  async create(data: T): Promise<any> {
    return this.getCollection().insertOne(data as OptionalUnlessRequiredId<T>);
  }

  async find(query: object): Promise<T[]> {
    const results = await this.getCollection().find(query).toArray();
    return results.map(({...rest }) => ({ ...rest }) as T); // Transform
  }

  async findOne(query: object): Promise<T | null> {
    const result = await this.getCollection().findOne(query);
    if (!result) return null;
    const { _id, ...rest } = result;
    return { ...rest } as T; // Transform
  }

  async update(query: object, updateData: Partial<T>): Promise<any> {
    return this.getCollection().updateOne(query, { $set: updateData });
  }

  async delete(query: object): Promise<any> {
    return this.getCollection().deleteOne(query);
  }
}