import { Collection, ObjectId } from "mongodb";

export class TodoRepository {
  collection: Collection;

  constructor(private options: any) {
    this.collection = options.collection;
  }

  async getTodos() {
    return this.collection.find().toArray();
  }

  async getTodoById(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) });
  }
}
