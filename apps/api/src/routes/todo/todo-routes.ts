import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';

import {
  getTodoHandler,
  getTodoByIdHandler,
  createTodoHandler,
  updateTodoHandler,
  getTodosQuerySchema,
  getTodoByIdParamSchema,
  createTodoSchema,
  updateTodoBodySchema,
  updateTodoParamSchema,
} from '../../handlers/todo';

const ROUTE_KEY = '/todos';
const router = new Hono();

router.get('/', zValidator('query', getTodosQuerySchema), getTodoHandler);
router.get('/:id', zValidator('param', getTodoByIdParamSchema), getTodoByIdHandler);
router.post('/', zValidator('json', createTodoSchema), createTodoHandler);
router.patch('/:id', zValidator('param', updateTodoParamSchema), zValidator('json', updateTodoBodySchema), updateTodoHandler);

export default [ROUTE_KEY, router] as const;
