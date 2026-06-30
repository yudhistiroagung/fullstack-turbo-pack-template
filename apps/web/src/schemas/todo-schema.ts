import { z } from 'zod';

export const todoNameSchema = z.object({
  name: z.string().min(1, 'Todo name is required'),
});

export type TodoNameForm = z.infer<typeof todoNameSchema>;
