import { z } from 'zod';
import type { Context } from 'hono';

export const getTodoByIdParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export const getTodoByIdHandler = async (c: Context) => {
  const todoService = c.get('todoService');
  const userId = c.get('user').id;
  const id = c.req.param('id');

  const todo = await todoService.getTodoById(id, userId);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(todo);
};
