import { z } from 'zod';
import type { Context } from 'hono';

export const updateTodoParamSchema = z.object({
  id: z.string().min(1, 'ID is required'),
});

export const updateTodoHandler = async (c: Context) => {
  const todoService = c.get('todoService');
  const userId = c.get('user').id;
  const id = c.req.param('id');
  const data = await c.req.json();

  if (Object.keys(data).length === 0) {
    return c.json({ error: 'No fields to update' }, 400);
  }

  const todo = await todoService.updateTodo(id, data, userId);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(todo);
};
