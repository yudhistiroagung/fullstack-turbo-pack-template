import { z } from 'zod';

export const Todo = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  status: z.enum(['pending', 'done']),
  userId: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Todo = z.infer<typeof Todo>;

export const TodoDTO = z.object({
  _id: z.string().min(1),
  name: z.string().min(1),
  status: z.enum(['pending', 'done']),
  userId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
export type TodoDTO = z.infer<typeof TodoDTO>;
