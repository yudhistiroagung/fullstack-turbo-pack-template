import type { TodoRepository } from '../repositories/todo-repository';
import type { Todo } from '@repo/shared-models';

type Injectable = {
  repository: TodoRepository;
};

export class TodoService {
  private repository: TodoRepository;

  constructor(options: Injectable) {
    this.repository = options.repository;
  }

  async getTodos(userId: string): Promise<Todo[]> {
    return this.repository.getTodos(userId);
  }

  async getTodoById(id: string): Promise<Todo | null> {
    return this.repository.getTodoById(id);
  }

  async createTodo(name: string, userId: string): Promise<Todo> {
    return this.repository.createTodo(name, userId);
  }

  async updateTodo(id: string, fields: Record<string, unknown>): Promise<Todo | null> {
    return this.repository.updateTodo(id, fields);
  }
}
