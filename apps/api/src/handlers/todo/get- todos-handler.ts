import { Context } from 'hono';

export const getTodoHandler = async (c: Context) => {
  const todoService = c.get('todoService');

  const todos = await todoService.getTodos();

  return c.json({ todos });
};
