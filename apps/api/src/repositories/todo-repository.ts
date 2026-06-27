import { Collection } from "mongodb";

export class TodoRepository {
  collection: Collection;

  constructor(private options: any) {
    this.collection = options.collection;
  }

  async getTodos() {
    return this.collection.find().toArray();
  }
}
