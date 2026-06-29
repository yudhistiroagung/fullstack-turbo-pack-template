import type { TodoRepository } from "../repositories/todo-repository";

type Injectable = {
  repository: TodoRepository;
}

export class TodoService {
  private readonly repository: TodoRepository;

  constructor(private readonly options: Injectable) {
    this.repository = options.repository;
  }

  async getTodos() {
    return this.repository.getTodos();
  }

  async getTodoById(id: string) {
    return this.repository.getTodoById(id);
  }
}