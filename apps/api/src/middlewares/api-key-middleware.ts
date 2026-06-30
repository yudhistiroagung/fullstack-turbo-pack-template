import { createMiddleware } from 'hono/factory';
import config from '../config';

export const apiKeyMiddleware = createMiddleware(async (c, next) => {
  if (c.req.path.startsWith('/api/auth')) {
    await next()
    return;
  }

  const apiKey = c.req.header('x-api-key');

  if (!apiKey || apiKey !== config.apiKey) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  await next();
});
