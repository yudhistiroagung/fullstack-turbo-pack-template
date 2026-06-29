import { z } from 'zod';
import type { Context } from 'hono';

const createTodoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
});

export const createTodoHandler = async (c: Context) => {
  const todoService = c.get('todoService');

  const body = await c.req.json();
  const result = createTodoSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: result.error.issues[0]?.message ?? 'Validation failed' }, 400);
  }

  const todo = await todoService.createTodo(result.data.name);

  return c.json(todo, 201);
};
