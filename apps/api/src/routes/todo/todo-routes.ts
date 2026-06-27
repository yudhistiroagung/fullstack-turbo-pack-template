import { Hono } from 'hono';

import { getTodoHandler } from '../../handlers/todo';

const ROUTE_KEY = '/todos';
const router = new Hono();

router.get('/', getTodoHandler);

export default [ROUTE_KEY, router] as const;
