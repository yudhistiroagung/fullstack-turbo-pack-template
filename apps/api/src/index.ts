import { Hono } from 'hono';

import { connectDB } from './db/mongo-db';
import config from './config';
import middlewares from './middlewares';
import betterAuthHandler from './middlewares/auth-middleware';
import routes from './routes';

import type { ApiEnv } from './types';

const port = config.port;
const app = new Hono<ApiEnv>();
const api = new Hono();

connectDB().then(({ db, client }) => {
  app.use(...middlewares.preMiddlewares);
  betterAuthHandler(app, db, client);

  for (const route of routes) {
    api.route(...route);
  }

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
