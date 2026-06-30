import type { TodoRepository } from '../repositories/todo-repository';
import type { TodoDTO, UpdateTodoDTO } from '@repo/shared-models';
import { toTodoDTO } from '@repo/shared-models';

type Injectable = {
  repository: TodoRepository;
};

export class TodoService {
  private repository: TodoRepository;

  constructor(options: Injectable) {
    this.repository = options.repository;
  }

  async getTodos(userId: string): Promise<TodoDTO[]> {
    const todos = await this.repository.getTodos(userId);
    return todos.map(toTodoDTO);
  }

  async getTodoById(id: string, userId: string): Promise<TodoDTO | null> {
    const todo = await this.repository.getTodoById(id, userId);
    if (!todo) return null;
    return toTodoDTO(todo);
  }

  async createTodo(name: string, userId: string): Promise<TodoDTO> {
    const todo = await this.repository.createTodo(name, userId);
    return toTodoDTO(todo);
  }

  async updateTodo(id: string, fields: UpdateTodoDTO, userId: string): Promise<TodoDTO | null> {
    const todo = await this.repository.updateTodo(id, fields, userId);
    if (!todo) return null;
    return toTodoDTO(todo);
  }
}
