import { z } from 'zod';
import type { Context } from 'hono';

const updateTodoSchema = z.object({
  name: z.string().min(1).optional(),
  status: z.enum(['pending', 'done']).optional(),
});

export const updateTodoHandler = async (c: Context) => {
  const todoService = c.get('todoService');
  const id = c.req.param('id');

  if (!id) {
    return c.json({ error: 'ID is required' }, 400);
  }

  const body = await c.req.json();
  const result = updateTodoSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: result.error.issues[0]?.message ?? 'Validation failed' }, 400);
  }

  if (Object.keys(result.data).length === 0) {
    return c.json({ error: 'No fields to update' }, 400);
  }

  const todo = await todoService.updateTodo(id, result.data);

  if (!todo) {
    return c.json({ error: 'Todo not found' }, 404);
  }

  return c.json(todo);
};
