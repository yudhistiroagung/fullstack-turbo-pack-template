import { Hono } from 'hono';

import { getTodoHandler, getTodoByIdHandler, createTodoHandler, updateTodoHandler } from '../../handlers/todo';

const ROUTE_KEY = '/todos';
const router = new Hono();

router.get('/', getTodoHandler);
router.get('/:id', getTodoByIdHandler);
router.post('/', createTodoHandler);
router.patch('/:id', updateTodoHandler);

export default [ROUTE_KEY, router] as const;
