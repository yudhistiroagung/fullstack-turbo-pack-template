import { z } from 'zod';
import type { Context } from 'hono';

export const createTodoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const createTodoHandler = async (c: Context) => {
  const todoService = c.get('todoService');
  const userId = c.get('user').id;
  const { name } = await c.req.json();

  const todo = await todoService.createTodo(name, userId);

  return c.json(todo, 201);
};
