import { z } from 'zod';
import { Todo } from '@repo/shared-models';

export const todoNameSchema = Todo.pick({ name: true });

export type TodoNameForm = z.infer<typeof todoNameSchema>;
