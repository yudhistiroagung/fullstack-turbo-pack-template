const ENV = process.env;

const getString = (key: string) => {
  const value = ENV[key];
  if (typeof value === 'string') {
    return value;
  }

  throw new Error(`ENV ${key} is not a string`);
};

const getInt = (key: string) => {
  const value = parseInt(ENV[key] as any);
  if (typeof value === 'number') {
    return value;
  }

  throw new Error(`ENV ${key} is not a number`);
};

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
  }
} as const;
