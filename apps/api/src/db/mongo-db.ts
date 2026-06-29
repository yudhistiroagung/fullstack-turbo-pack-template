import { MongoClient } from 'mongodb';
import config from '../config';

const mongoURI = `mongodb://${config.mongoDb.username}:${config.mongoDb.password}@${config.mongoDb.url}/${config.mongoDb.name}?authSource=${config.mongoDb.username}`;

export const client = new MongoClient(mongoURI);
let db: ReturnType<typeof client.db>;

export const connectDB = async () => {
  await client.connect();
  console.log('Connected to MongoDB');
  db = client.db(config.mongoDb.name);
  return { db, client };
};

export const getDB = () => {
  if (!db) {
    throw new Error('MongoDB not connected');
  }
  return db;
}
