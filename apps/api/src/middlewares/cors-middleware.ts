import { cors } from 'hono/cors';

import config from '../config';

const corsMiddleware = cors({
  origin: config.corsOrigin,
  allowHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  allowMethods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
});

export default corsMiddleware;
