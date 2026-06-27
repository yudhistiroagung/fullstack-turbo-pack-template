import { Hono } from 'hono';

import { getTodoHandler, getTodoByIdHandler } from '../../handlers/todo';

const ROUTE_KEY = '/todos';
const router = new Hono();

router.get('/', getTodoHandler);
router.get('/:id', getTodoByIdHandler);

export default [ROUTE_KEY, router] as const;
