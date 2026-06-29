import type { TodoRepository } from '../repositories/todo-repository';

type Injectable = {
  repository: TodoRepository;
};

export class TodoService {
  private repository: TodoRepository;

  constructor(options: Injectable) {
    this.repository = options.repository;
  }

  async getTodos() {
    return this.repository.getTodos();
  }

  async getTodoById(id: string) {
    return this.repository.getTodoById(id);
  }

  async createTodo(name: string) {
    return this.repository.createTodo(name);
  }

  async updateTodo(id: string, fields: Record<string, unknown>) {
    return this.repository.updateTodo(id, fields);
  }
}
