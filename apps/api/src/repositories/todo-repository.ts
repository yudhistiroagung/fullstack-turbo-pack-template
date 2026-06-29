import { ObjectId } from 'mongodb';

import type { Collection } from 'mongodb';

type Injectable = {
  collection: Collection;
};

export class TodoRepository {
  collection: Collection;

  constructor(options: Injectable) {
    this.collection = options.collection;
  }

  async getTodos(userId: string) {
    return this.collection.find({ userId }).toArray();
  }

  async getTodoById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }

  async createTodo(name: string, userId: string) {
    const result = await this.collection.insertOne({
      name,
      userId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.collection.findOne({ _id: result.insertedId });
  }

  async updateTodo(id: string, fields: Record<string, unknown>, userId?: string) {
    await this.collection.updateOne(
      { _id: new ObjectId(id), ...(userId ? { userId } : {}) },
      { $set: { ...fields, updatedAt: new Date() } },
    );
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}
