import { TodoRepository } from "../repositories/todo-repository";

export class TodoService {
  private readonly repository: TodoRepository;

  constructor(private readonly options: any) {
    this.repository = options.repository;
  }

  async getTodos() {
    return this.repository.getTodos();
  }

  async getTodoById(id: string) {
    return this.repository.getTodoById(id);
  }
}