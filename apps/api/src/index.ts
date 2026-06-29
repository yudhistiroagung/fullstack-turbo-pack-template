import { Hono } from 'hono';
import { cors } from 'hono/cors';

import { connectDB } from './db/mongo-db';
import config from './config';
import middlewares from './middlewares';
import routes from './routes';
import { createAuth } from './lib/auth';

import type { ApiEnv } from './types';

const port = config.port;
const app = new Hono<ApiEnv>();
const api = new Hono();

connectDB().then(({ db, client }) => {
  app.use(...middlewares);

  for (const route of routes) {
    api.route(...route);
  }

  // Create Better Auth instance with MongoDB adapter
  const auth = createAuth(db, client);

  // CORS for Better Auth endpoints
  app.use(
    '/api/auth/*',
    cors({
      origin: config.corsOrigin,
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    }),
  );

  // Mount Better Auth handler
  app.on(['POST', 'GET'], '/api/auth/*', (c) => auth.handler(c.req.raw));

  // Set up all routes immediately
  app.get('/', (c) => {
    return c.json({
      message: 'Hello from Hono + MongoDB!',
    });
  });

  app.get('/health', (c) => {
    return c.json({
      status: 'ok',
    });
  });

  app.route('/api', api);

  console.log(`API server running on port ${port}`);
});

export default {
  port,
  fetch: app.fetch,
};
