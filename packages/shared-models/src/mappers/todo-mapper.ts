import { Todo, TodoDTO, type Todo as TodoType, type TodoDTO as TodoDTOType } from '../todo-schema';

export function toTodoDTO(todo: TodoType): TodoDTOType {
  return TodoDTO.parse({
    ...todo,
    createdAt: todo.createdAt?.toISOString(),
    updatedAt: todo.updatedAt?.toISOString(),
  });
}

export function fromTodoDTO(dto: TodoDTOType): TodoType {
  return Todo.parse({
    ...dto,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : undefined,
    updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
  });
}
