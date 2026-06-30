import { MongoClient } from 'mongodb';
import config from '../config';

const mongoURI = `mongodb://${config.mongoDb.username}:${config.mongoDb.password}@${config.mongoDb.url}/${config.mongoDb.name}?authSource=${config.mongoDb.username}`;

export const client = new MongoClient(mongoURI);
export type AppDatabase = ReturnType<typeof client.db>;

let db: AppDatabase;

const createIndex = async (database: AppDatabase, collection: string) => {
  await database.collection(collection).createIndex({ userId: 1 });
};

export const connectDB = async () => {
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(config.mongoDb.name);
  
  await createIndex(db, config.collections.todos);

  return { db, client };
};

export const getDB = () => {
  return db;
};
