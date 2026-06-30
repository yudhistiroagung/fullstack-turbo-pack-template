import { describe, it, expect } from 'vitest';
import { Todo, TodoDTO, UpdateTodoDTO } from '../todo-schema';
import { toTodoDTO, fromTodoDTO } from '../mappers/todo-mapper';

describe('Todo schema', () => {
  it('should parse a valid todo', () => {
    const valid = {
      _id: 'abc123',
      name: 'Buy groceries',
      status: 'pending',
      userId: 'user1',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    expect(() => Todo.parse(valid)).not.toThrow();
  });

  it('should fail on missing required fields', () => {
    expect(() => Todo.parse({ name: 'Test' })).toThrow();
    expect(() => Todo.parse({ _id: '123', status: 'pending' })).toThrow();
  });

  it('should fail on invalid status', () => {
    const invalid = {
      _id: 'abc',
      name: 'Test',
      status: 'invalid',
    };
    expect(() => Todo.parse(invalid)).toThrow();
  });

  it('should accept optional fields being absent', () => {
    const minimal = {
      _id: 'abc',
      name: 'Test',
      status: 'pending',
    };
    expect(() => Todo.parse(minimal)).not.toThrow();
  });
});

describe('TodoDTO schema', () => {
  it('should parse a valid todo DTO', () => {
    const valid = {
      _id: 'abc123',
      name: 'Buy groceries',
      status: 'done',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    expect(() => TodoDTO.parse(valid)).not.toThrow();
  });
});

describe('UpdateTodoDTO schema', () => {
  it('should accept a name-only update', () => {
    expect(() => UpdateTodoDTO.parse({ name: 'Updated name' })).not.toThrow();
  });

  it('should accept a status-only update', () => {
    expect(() => UpdateTodoDTO.parse({ status: 'done' })).not.toThrow();
  });

  it('should accept both fields', () => {
    expect(() =>
      UpdateTodoDTO.parse({ name: 'Updated', status: 'pending' }),
    ).not.toThrow();
  });

  it('should reject invalid status', () => {
    expect(() => UpdateTodoDTO.parse({ status: 'archived' })).toThrow();
  });

  it('should reject empty object', () => {
    expect(() => UpdateTodoDTO.parse({})).not.toThrow(); // all fields optional
  });

  it('should reject empty name', () => {
    expect(() => UpdateTodoDTO.parse({ name: '' })).toThrow();
  });
});

describe('todo mappers', () => {
  const todo = Todo.parse({
    _id: 'abc123',
    name: 'Test todo',
    status: 'pending',
    userId: 'user1',
    createdAt: new Date('2025-01-01T00:00:00.000Z'),
    updatedAt: new Date('2025-01-02T00:00:00.000Z'),
  });

  describe('toTodoDTO', () => {
    it('should convert Todo to TodoDTO with ISO string dates', () => {
      const dto = toTodoDTO(todo);
      expect(dto.createdAt).toBe('2025-01-01T00:00:00.000Z');
      expect(dto.updatedAt).toBe('2025-01-02T00:00:00.000Z');
      expect(dto._id).toBe('abc123');
      expect(dto.name).toBe('Test todo');
      expect(dto.status).toBe('pending');
    });

    it('should handle missing optional date fields', () => {
      const todoNoDates = Todo.parse({
        _id: 'abc',
        name: 'No dates',
        status: 'done',
      });
      const dto = toTodoDTO(todoNoDates);
      expect(dto.createdAt).toBeUndefined();
      expect(dto.updatedAt).toBeUndefined();
    });
  });

  describe('fromTodoDTO', () => {
    it('should convert TodoDTO back to Todo with Date objects', () => {
      const dto = toTodoDTO(todo);
      const converted = fromTodoDTO(dto);
      expect(converted.createdAt).toBeInstanceOf(Date);
      expect(converted.updatedAt).toBeInstanceOf(Date);
      expect(converted.name).toBe('Test todo');
    });
  });

  describe('round-trip', () => {
    it('should maintain data through toTodoDTO -> fromTodoDTO', () => {
      const dto = toTodoDTO(todo);
      const back = fromTodoDTO(dto);
      expect(back._id).toBe(todo._id);
      expect(back.name).toBe(todo.name);
      expect(back.status).toBe(todo.status);
    });
  });
});
