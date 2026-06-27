import { Collection } from "mongodb";
import { TodoRepository } from "./repositories/todo-repository";
import { TodoService } from "./services/todo-service";

export type ApiEnv = {
    Variables: {
        todoCollection: Collection;
        todoRepository: TodoRepository;
        todoService: TodoService;
    }
}