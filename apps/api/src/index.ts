import { Hono } from 'hono';

import { connectDB } from './db/mongo-db';
import config from './config';
import middlewares from './middlewares';
import routes from './routes';

import { ApiEnv } from './types';

const port = config.port;
const app = new Hono<ApiEnv>();
const api = new Hono();

connectDB().then(() => {
  app.use(...middlewares);

  routes.forEach((r) => {
    api.route(...r);
  });

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
