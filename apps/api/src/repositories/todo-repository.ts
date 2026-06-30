import { ObjectId } from 'mongodb';

import type { Collection } from 'mongodb';
import { Todo, UpdateTodoDTO, type Todo as TodoType } from '@repo/shared-models';

type Injectable = {
  collection: Collection;
};

export class TodoRepository {
  collection: Collection;

  constructor(options: Injectable) {
    this.collection = options.collection;
  }

  private parseDoc(doc: unknown): TodoType {
    const normalized = { ...(doc as Record<string, unknown>), _id: String((doc as Record<string, unknown>)._id) };
    return Todo.parse(normalized);
  }

  async getTodos(userId: string): Promise<TodoType[]> {
    const docs = await this.collection.find({ userId }).toArray();
    return docs.map((doc) => this.parseDoc(doc));
  }

  async getTodoById(id: string, userId: string): Promise<TodoType | null> {
    const doc = await this.collection.findOne({ _id: new ObjectId(id), userId });
    if (!doc) return null;
    return this.parseDoc(doc);
  }

  async createTodo(name: string, userId: string): Promise<TodoType> {
    const result = await this.collection.insertOne({
      name,
      userId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const doc = await this.collection.findOne({ _id: result.insertedId });
    return this.parseDoc(doc);
  }

  async updateTodo(id: string, fields: UpdateTodoDTO, userId: string): Promise<TodoType | null> {
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id), userId },
      { $set: { ...fields, updatedAt: new Date() } },
      { returnDocument: 'after' },
    );
    if (!result) return null;
    return this.parseDoc(result);
  }
}
