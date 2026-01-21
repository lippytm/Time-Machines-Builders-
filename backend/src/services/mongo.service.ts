import { MongoClient, Db } from 'mongodb';
import { config } from '../config';

class MongoService {
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    this.client = new MongoClient(config.database.mongodb.uri);
  }

  async initialize(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log('✓ MongoDB connected successfully');
      await this.createCollections();
    } catch (error) {
      console.error('✗ MongoDB connection failed:', error);
      throw error;
    }
  }

  private async createCollections(): Promise<void> {
    if (!this.db) return;

    const collections = await this.db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    if (!collectionNames.includes('ai_outputs')) {
      await this.db.createCollection('ai_outputs');
    }

    if (!collectionNames.includes('training_data')) {
      await this.db.createCollection('training_data');
    }

    if (!collectionNames.includes('user_sessions')) {
      await this.db.createCollection('user_sessions');
    }

    console.log('✓ MongoDB collections initialized');
  }

  getDatabase(): Db {
    if (!this.db) {
      throw new Error('MongoDB not initialized');
    }
    return this.db;
  }

  async saveAIOutput(data: {
    prompt: string;
    response: string;
    model: string;
    metadata?: any;
  }): Promise<any> {
    const collection = this.getDatabase().collection('ai_outputs');
    const result = await collection.insertOne({
      ...data,
      timestamp: new Date(),
    });
    return result;
  }

  async getAIOutputs(limit: number = 10): Promise<any[]> {
    const collection = this.getDatabase().collection('ai_outputs');
    return collection.find().sort({ timestamp: -1 }).limit(limit).toArray();
  }

  async saveTrainingData(data: any): Promise<any> {
    const collection = this.getDatabase().collection('training_data');
    return collection.insertOne({
      ...data,
      timestamp: new Date(),
    });
  }

  async close(): Promise<void> {
    await this.client.close();
  }
}

export const mongoService = new MongoService();
