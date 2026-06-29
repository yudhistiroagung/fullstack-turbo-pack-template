import type { Collection } from 'mongodb';
import type { TodoRepository } from './repositories/todo-repository';
import type { TodoService } from './services/todo-service';
import type { User } from 'better-auth';

export type ApiEnv = {
  Variables: {
    user: User;
    todoCollection: Collection;
    todoRepository: TodoRepository;
    todoService: TodoService;
  };
};
