import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Database, open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { Repository } from './repository.interface';

@Injectable()
export class SQLiteRepository<T> implements Repository<T>, OnModuleInit, OnModuleDestroy {
  private db?: Database;
  private readonly tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  // Initialize the SQLite connection when the module is initialized
  async onModuleInit() {
    this.db = await open({
      filename: './database.db', // Path to your SQLite database file
      driver: sqlite3.Database, // SQLite driver
    });
    console.log(`Connected to SQLite database`);
  }

  // Close the SQLite connection when the module is destroyed
  async onModuleDestroy() {
    if (this.db) {
      await this.db.close();
      console.log('SQLite connection closed');
    }
  }

  // Helper method to execute SQL queries
  private async runQuery(query: string, params: any[] = []): Promise<any> {
    return this.db?.run(query, params);
  }

  private async getRows(query: string, params: any[] = []): Promise<T[]> {
    return this.db?.all(query, params);
  }

  async create(data: T): Promise<any> {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const placeholders = keys.map(() => '?').join(',');
    const query = `INSERT INTO ${this.tableName} (${keys.join(',')}) VALUES (${placeholders})`;

    return this.runQuery(query, values);
  }

  async find(query: object): Promise<T[]> {
    const whereClause = Object.entries(query)
      .map(([key, value]) => `${key} = ?`)
      .join(' AND ');

    const params = Object.values(query);
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE ${whereClause}`;

    return this.getRows(sqlQuery, params);
  }

  async findOne(query: object): Promise<T | null> {
    const whereClause = Object.entries(query)
      .map(([key, value]) => `${key} = ?`)
      .join(' AND ');

    const params = Object.values(query);
    const sqlQuery = `SELECT * FROM ${this.tableName} WHERE ${whereClause} LIMIT 1`;

    const rows = await this.getRows(sqlQuery, params);
    return rows.length ? rows[0] : null;
  }

  async update(query: object, updateData: Partial<T>): Promise<any> {
    const setClause = Object.entries(updateData)
      .map(([key, value]) => `${key} = ?`)
      .join(', ');

    const whereClause = Object.entries(query)
      .map(([key, value]) => `${key} = ?`)
      .join(' AND ');

    const params = [...Object.values(updateData), ...Object.values(query)];
    const sqlQuery = `UPDATE ${this.tableName} SET ${setClause} WHERE ${whereClause}`;

    return this.runQuery(sqlQuery, params);
  }

  async delete(query: object): Promise<any> {
    const whereClause = Object.entries(query)
      .map(([key, value]) => `${key} = ?`)
      .join(' AND ');

    const params = Object.values(query);
    const sqlQuery = `DELETE FROM ${this.tableName} WHERE ${whereClause}`;

    return this.runQuery(sqlQuery, params);
  }
}
