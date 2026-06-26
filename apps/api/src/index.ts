import { Hono } from 'hono';
import { MongoClient } from 'mongodb';

const app = new Hono();

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(mongoUri);

async function connectToMongo() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToMongo();

app.get('/', (c) => {
  return c.json({
    message: 'Hello from Hono + MongoDB!',
  });
});

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    mongo: client.topology?.isConnected() ? 'connected' : 'disconnected',
  });
});

const port = Number(process.env.PORT) || 3001;

export default {
  port,
  fetch: app.fetch,
};
