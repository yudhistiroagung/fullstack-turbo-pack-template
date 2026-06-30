import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { UpdateTodoDTO } from '@repo/shared-models';

import {
  getTodoHandler,
  getTodoByIdHandler,
  createTodoHandler,
  updateTodoHandler,
  getTodoByIdParamSchema,
  createTodoSchema,
  updateTodoParamSchema,
} from '../../handlers/todo';

const ROUTE_KEY = '/todos';
const router = new Hono();

router.get('/', getTodoHandler);
router.get('/:id', zValidator('param', getTodoByIdParamSchema), getTodoByIdHandler);
router.post('/', zValidator('json', createTodoSchema), createTodoHandler);
router.patch('/:id', zValidator('param', updateTodoParamSchema), zValidator('json', UpdateTodoDTO), updateTodoHandler);

export default [ROUTE_KEY, router] as const;
