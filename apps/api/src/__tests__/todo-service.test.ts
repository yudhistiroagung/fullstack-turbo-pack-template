import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TodoService } from '../services/todo-service';
import { Todo } from '@repo/shared-models';
import type { TodoRepository } from '../repositories/todo-repository';

const makeTodo = (overrides: Record<string, unknown> = {}) =>
  Todo.parse({
    _id: 'abc123',
    name: 'Test todo',
    status: 'pending',
    userId: 'user1',
    createdAt: new Date('2025-01-01T00:00:00.000Z'),
    updatedAt: new Date('2025-01-01T00:00:00.000Z'),
    ...overrides,
  });

describe('TodoService', () => {
  let service: TodoService;
  let mockRepo: TodoRepository;

  beforeEach(() => {
    mockRepo = {
      getTodos: vi.fn(),
      getTodoById: vi.fn(),
      createTodo: vi.fn(),
      updateTodo: vi.fn(),
    } as unknown as TodoRepository;

    service = new TodoService({ repository: mockRepo });
  });

  describe('getTodos', () => {
    it('should return todo DTOs for a user', async () => {
      const todos = [makeTodo({ _id: '1' }), makeTodo({ _id: '2' })];
      vi.mocked(mockRepo.getTodos).mockResolvedValue(todos);

      const result = await service.getTodos('user1');

      expect(mockRepo.getTodos).toHaveBeenCalledWith('user1');
      expect(result).toHaveLength(2);
      expect(typeof result[0].createdAt).toBe('string');
      expect(typeof result[0].updatedAt).toBe('string');
      expect(result[0]._id).toBe('1');
    });

    it('should return empty array when no todos exist', async () => {
      vi.mocked(mockRepo.getTodos).mockResolvedValue([]);

      const result = await service.getTodos('user1');

      expect(result).toEqual([]);
    });
  });

  describe('getTodoById', () => {
    it('should return a todo DTO by id', async () => {
      const todo = makeTodo({ _id: 'abc' });
      vi.mocked(mockRepo.getTodoById).mockResolvedValue(todo);

      const result = await service.getTodoById('abc');

      expect(mockRepo.getTodoById).toHaveBeenCalledWith('abc');
      expect(result).not.toBeNull();
      expect(result!._id).toBe('abc');
      expect(typeof result!.createdAt).toBe('string');
    });

    it('should return null when todo not found', async () => {
      vi.mocked(mockRepo.getTodoById).mockResolvedValue(null);

      const result = await service.getTodoById('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('createTodo', () => {
    it('should create a todo and return DTO', async () => {
      const todo = makeTodo({ _id: 'new1', name: 'New todo' });
      vi.mocked(mockRepo.createTodo).mockResolvedValue(todo);

      const result = await service.createTodo('New todo', 'user1');

      expect(mockRepo.createTodo).toHaveBeenCalledWith('New todo', 'user1');
      expect(result.name).toBe('New todo');
      expect(typeof result.createdAt).toBe('string');
    });
  });

  describe('updateTodo', () => {
    it('should update and return DTO', async () => {
      const todo = makeTodo({ _id: 'abc', status: 'done' });
      vi.mocked(mockRepo.updateTodo).mockResolvedValue(todo);

      const result = await service.updateTodo('abc', { status: 'done' });

      expect(mockRepo.updateTodo).toHaveBeenCalledWith('abc', { status: 'done' });
      expect(result).not.toBeNull();
      expect(result!.status).toBe('done');
    });

    it('should return null when todo not found', async () => {
      vi.mocked(mockRepo.updateTodo).mockResolvedValue(null);

      const result = await service.updateTodo('nonexistent', { name: 'x' });

      expect(result).toBeNull();
    });
  });
});
