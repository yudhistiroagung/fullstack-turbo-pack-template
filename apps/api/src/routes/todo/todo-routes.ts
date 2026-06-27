import { Hono } from 'hono';

const ROUTE_KEY = '/todos';
const router = new Hono();

router.get('/', (c) => {
  return c.json({ todos: [] });
});

export default [ROUTE_KEY, router] as const;
