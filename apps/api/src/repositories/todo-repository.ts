import { ObjectId } from 'mongodb';

import type { Collection } from 'mongodb';

type Injectable = {
  collection: Collection;
};

export class TodoRepository {
  collection: Collection;

  constructor(private options: Injectable) {
    this.collection = options.collection;
  }

  async getTodos() {
    return this.collection.find().toArray();
  }

  async getTodoById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}
