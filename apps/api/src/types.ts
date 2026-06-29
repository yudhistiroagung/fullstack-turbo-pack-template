import type { Collection } from 'mongodb';
import type { TodoRepository } from './repositories/todo-repository';
import type { TodoService } from './services/todo-service';

export type ApiEnv = {
  Variables: {
    todoCollection: Collection;
    todoRepository: TodoRepository;
    todoService: TodoService;
  };
};
