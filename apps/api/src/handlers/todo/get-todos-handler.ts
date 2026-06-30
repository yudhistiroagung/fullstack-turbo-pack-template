import type { Context } from 'hono';

export const getTodoHandler = async (c: Context) => {
  const todoService = c.get('todoService');
  const userId = c.get('user').id;

  const todos = await todoService.getTodos(userId);

  return c.json({ todos });
};
