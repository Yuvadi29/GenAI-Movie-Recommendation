import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGO_URL;
if (!uri) throw new Error('Please add your Mongo URI to .env.local');

const client = new MongoClient(uri);

const db = client.connect();

export default db;