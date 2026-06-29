import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import type { Db, MongoClient } from "mongodb";

import config from "../config";

export const createAuth = (db: Db, client: MongoClient) => {
  return betterAuth({
    baseURL: config.betterAuthUrl,
    trustedOrigins: config.corsOrigin,
    database: mongodbAdapter(db),
    socialProviders: {
      google: {
        clientId: config.googleClientId,
        clientSecret: config.googleClientSecret,
      },
    },
  });
};

export type Auth = ReturnType<typeof createAuth>;
