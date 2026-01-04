import { Pool } from 'pg';
import { config } from '../config';

class PostgresService {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(config.database.postgres);
  }

  async initialize(): Promise<void> {
    try {
      await this.pool.query('SELECT NOW()');
      console.log('✓ PostgreSQL connected successfully');
      await this.createTables();
    } catch (error) {
      console.error('✗ PostgreSQL connection failed:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    const createTablesQuery = `
      CREATE TABLE IF NOT EXISTS prompts (
        id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        response TEXT,
        model VARCHAR(100),
        temperature DECIMAL(3,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS embeddings (
        id SERIAL PRIMARY KEY,
        text TEXT NOT NULL,
        embedding FLOAT8[],
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS workflows (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        config JSONB,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await this.pool.query(createTablesQuery);
    console.log('✓ PostgreSQL tables initialized');
  }

  async query(text: string, params?: any[]): Promise<any> {
    return this.pool.query(text, params);
  }

  async savePrompt(prompt: string, response: string, model: string, temperature: number): Promise<any> {
    const query = 'INSERT INTO prompts (prompt, response, model, temperature) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await this.pool.query(query, [prompt, response, model, temperature]);
    return result.rows[0];
  }

  async saveEmbedding(text: string, embedding: number[]): Promise<any> {
    const query = 'INSERT INTO embeddings (text, embedding) VALUES ($1, $2) RETURNING id';
    const result = await this.pool.query(query, [text, embedding]);
    return result.rows[0];
  }

  async getWorkflows(): Promise<any[]> {
    const result = await this.pool.query('SELECT * FROM workflows ORDER BY created_at DESC');
    return result.rows;
  }

  async close(): Promise<void> {
    await this.pool.end();
  }
}

export const postgresService = new PostgresService();
