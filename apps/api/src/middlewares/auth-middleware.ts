import { cors } from 'hono/cors';
import { createMiddleware } from 'hono/factory';

import type { Hono } from 'hono';
import type { Auth } from '../lib/auth';

import config from '../config';

import type { ApiEnv } from '../types';

// Middleware that protects routes by requiring a valid Better Auth session
export const authMiddleware= (auth: Auth) => createMiddleware<ApiEnv>(async (c, next) => {
  if (c.req.path.startsWith('/api/auth')) {
    await next()
    return;
  }

  const session = await auth?.api?.getSession({ headers: c.req.raw.headers });

  if (session && session.user) {
    c.set('user', session.user);
    return await next();
  }

  return c.json({ error: 'Invalid or expired session' }, 401);
});

export default async (app: Hono<ApiEnv>, auth: Auth) => {
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

  return auth;
};
