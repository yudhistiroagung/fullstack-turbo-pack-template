import { Context } from 'hono';

export const getTodoHandler = (c: Context) => {
  return c.json({ todos: [] });
};
