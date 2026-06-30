import { Hono } from 'hono';

import { connectDB } from './db/mongo-db';
import config from './config';
import middlewares from './middlewares';
import betterAuthHandler, { authMiddleware } from './middlewares/auth-middleware';
import routes from './routes';

import type { ApiEnv } from './types';
import { createAuth } from './lib/auth';

const port = config.port;
const app = new Hono<ApiEnv>();
const api = new Hono();

connectDB()
  .then(({ db, client }) => {
    const auth = createAuth(db, client);

    // Apply authMiddleware to all routes
    app.use(...middlewares.preMiddlewares);

    // specific for auth middlewares
    app.use(authMiddleware(auth));
    betterAuthHandler(app, auth);

    // all routes
    for (const route of routes) {
      api.route(...route);
    }

    // default root
    app.get('/', (c) => {
      return c.json({
        message: 'Hello',
      });
    });

    // health check
    app.get('/health', (c) => {
      return c.json({
        status: 'ok',
      });
    });

    app.route('/api', api);

    console.log(`API server running on port ${port}`);
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

export default {
  port,
  fetch: app.fetch,
};
