import type { Context } from 'hono';

export const getTodoByIdHandler = async (c: Context) => {
  const todoService = c.get('todoService');
  const id = c.req.param('id');

  if (!id) {
    return c.json({ error: 'ID is required' }, 400);
  }

  const todo = await todoService.getTodoById(id);

  return c.json(todo);
};
