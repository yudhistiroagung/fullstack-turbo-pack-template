import { getString as getStr, getInt as getIntNum } from '@repo/shared-utils';

const getString = (key: string) => getStr(process.env, key);
const getInt = (key: string) => getIntNum(process.env, key);

export default {
  name: 'api',
  port: getInt('PORT'),
  mongoDb: {
    url: getString('MONGO_DB_URL'),
    name: getString('MONGO_DB_NAME'),
    username: getString('MONGO_DB_USERNAME'),
    password: getString('MONGO_DB_PASSWORD'),
  },
  collections: {
    todos: getString('MONGODB_COLLECTION_TODO'),
  },
  apiKey: getString('API_KEY'),
  corsOrigin: getString('CORS_ORIGIN').split(','),
  googleClientId: getString('GOOGLE_CLIENT_ID'),
  googleClientSecret: getString('GOOGLE_CLIENT_SECRET'),
  betterAuthUrl: getString('BETTER_AUTH_URL'),
} as const;
