import { Db, MongoClient } from 'mongodb';
import { Auth } from 'better-auth';
import { Context, Hono } from 'hono';
import { cors } from 'hono/cors';

import config from '../config';
import { createAuth } from '../lib/auth';
import { ApiEnv } from '../types';

// CORS for Better Auth endpoints
export const betterAuthEndpoint = () => [
    '/api/auth/*',
    cors({
      origin: config.corsOrigin,
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    }),
];

// Mount Better Auth handler
export const betterAuthHandler = (auth: Auth) => [
    ['POST', 'GET'],
    (c: Context) => auth.handler(c.req.raw),
];

export default async (app: Hono<ApiEnv>, db: Db, client: MongoClient) => {
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
}
